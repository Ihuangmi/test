import { useState } from 'react';
import PQueue from 'p-queue';
import { calculateFileHash } from './hashUtils'; // 假设你已经有了计算文件哈希的工具函数

// 分片上传配置接口
interface UploadChunkProps {
  file: File;
  chunkSize?: number; // 分片大小，默认为1MB
  maxConcurrent: number; // 最大并发数
  onProgress?: (percentage: number) => void; // 上传进度回调
  onError?: (error: Error) => void; // 上传失败回调
  onSuccess?: () => void; // 上传成功回调
  mergeChunksEndpoint: string; // 合并分片的后端接口
}

// 上传单个分片的方法，包含计算和上传hash值
async function uploadChunkWithHash(
  chunk: Blob,
  index: number,
  chunkHash: string,
  // 这里的url是上传接口的地址，你需要根据你的后端API来配置
  url: string = 'https://your-backend.com/upload-chunk'
): Promise<string | undefined> {
  const formData = new FormData();
  formData.append('file', chunk);
  formData.append('index', index.toString());
  formData.append('hash', chunkHash);

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Chunk upload failed');
  }

  // 假设返回的是该分片在服务器上的标识符
  return await response.text();
}

// 分片上传hooks
export function useChunkedUpload({ file, chunkSize = 1 * 1024 * 1024, maxConcurrent = 6, onProgress, onError, onSuccess, mergeChunksEndpoint }: UploadChunkProps) {
  const [progress, setProgress] = useState(0);
  const queue = new PQueue({ concurrency: maxConcurrent });
  const chunkHashes: Array<{ hash: string; id: string | undefined }> = [];

  const uploadChunkWithProgressAndHash = async (chunkIndex: number) => {
    try {
      const start = chunkIndex * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);
      const chunkHash = calculateFileHash(chunk); // 计算分片的哈希值

      const chunkId = await uploadChunkWithHash(chunk, chunkIndex, chunkHash);
      if (chunkId) {
        chunkHashes.push({ hash: chunkHash, id: chunkId });
      }

      const uploadedChunks = queue.size + queue.pending;
      const chunkCount = Math.ceil(file.size / chunkSize);
      const percentage = Math.round((uploadedChunks / chunkCount) * 100);
      setProgress(percentage);
      onProgress && onProgress(percentage);
    } catch (error) {
      onError && onError(error as Error);
    }
  };

  const upload = async () => {
    const chunkCount = Math.ceil(file.size / chunkSize);

    for (let index = 0; index < chunkCount; index++) {
      queue.add(() => uploadChunkWithProgressAndHash(index));
    }

    await queue.onIdle(); // 等待所有任务完成
    // 所有分片上传完后，调用合并接口
    if (chunkHashes.length === chunkCount) {
      const requestBody = { hashes: chunkHashes.map(item => item.hash), ids: chunkHashes.map(item => item.id) };
      await fetch(mergeChunksEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }).then(response => {
        if (!response.ok) {
          throw new Error('Merge chunks failed');
        }
        onSuccess && onSuccess();
      });
    }
  };

  return {
    upload,
    progress,
  };
}