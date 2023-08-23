import { useState } from "react";

// 定义上传数据类型
interface UploadData {
  file: Blob;
  index: number;
}

// 定义上传响应类型
interface UploadResponse {
  success: boolean;
  url?: string;
  message?: string;
}

// 定义文件分片类型
interface Chunk {
  index: number;
  start: number;
  end: number;
  progress: number;
  isUploaded: boolean;
  response?: UploadResponse;
  file: Blob;
}

// 定义文件上传进度类型
interface Progress {
  total: number;
  uploaded: number;
  percentage: number;
}

// 定义上传选项类型
interface Options {
  chunkSize?: number;
  retryCount?: number;
  concurrency?: number;
  endpoint: string;
}

// 默认上传选项
const defaultOptions: Options = {
  chunkSize: 5 * 1024 * 1024, // 5 MB
  retryCount: 3,
  concurrency: 3,
  endpoint: "",
};

// 文件分片上传
const useFileUploader = (
  options: Options = defaultOptions,
  uploadFunction: (data: UploadData) => Promise<UploadResponse>,
  onUploadSuccess: (data: any[]) => Promise<UploadResponse>
) => {
  const [chunks, setChunks] = useState<Chunk[]>([]);
  const [progress, setProgress] = useState<Progress>({
    total: 0,
    uploaded: 0,
    percentage: 0,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // 上传分片函数，内部进行了重试操作
  const uploadChunks = async () => {
    setIsUploading(true);
    setErrorMessage("");

    // 复制一份分片列表
    const chunksCopy = [...chunks];
    const totalChunks = chunksCopy.length;
    let uploadedChunks = 0;

    // 遍历每个分片进行上传
    for (let i = 0; i < totalChunks; i++) {
      const chunk = chunksCopy[i];
      if (chunk.isUploaded) continue;

      // 重置上传进度
      chunk.progress = 0;

      try {
        // 调用上传函数进行上传
        const response = await uploadFunction({
          file: chunk.file,
          index: chunk.index,
        });
        if (response.success) {
          chunk.isUploaded = true;
          chunk.response = response;
          uploadedChunks++;
        } else {
          throw new Error(response.message || "Upload failed");
        }
      } catch (error) {
        // 如果上传失败，重置上传进度
        if (chunk.progress < 100) {
          chunk.progress = 0;
        }

        // 如果未设置重试次数，则使用默认重试次数
        if (chunk.retryCount === undefined) {
          chunk.retryCount = options.retryCount ?? defaultOptions.retryCount;
        }

        // 如果还有重试次数，则将该分片插入到列表的下一个位置，准备重试
        if (chunk.retryCount > 0) {
          chunk.retryCount--;
          chunksCopy.splice(i + 1, 0, chunk);
        } else {
          // 如果已经没有重试次数，则上传失败
          setErrorMessage(error.message || "Upload failed");
          setIsUploading(false);
          return;
        }
      }

      // 更新上传进度
      const uploadedSize = chunksCopy
        .filter((c) => c.isUploaded)
        .reduce((acc, c) => acc + c.file.size, 0);
      setProgress({
        total: chunksCopy.reduce((acc, c) => acc + c.file.size, 0),
        uploaded: uploadedSize,
        percentage: Math.floor((uploadedSize / progress.total) * 100),
      });

      // 如果所有分片都上传完成，则上传结束
      if (uploadedChunks === totalChunks) {
        setIsUploading(false);
        onUploadSuccess();
      }
    }
  };

  // 手动上传文件函数，接收一个 File 对象作为参数
  const handleUpload = (file: File) => {
    // 将文件分成多个分片
    const chunks: Chunk[] = [];
    const fileSize = file.size;
    const chunkSize = options.chunkSize ?? defaultOptions.chunkSize;
    const totalChunks = Math.ceil(fileSize / chunkSize);

    for (let i = 0; i < totalChunks; i++) {
      const start = i * chunkSize;
      const end = Math.min((i + 1) * chunkSize, fileSize);
      const chunkFile = file.slice(start, end);

      chunks.push({
        index: i,
        start,
        end,
        progress: 0,
        isUploaded: false,
        file: chunkFile,
      });
    }

    // 初始化状态
    setChunks(chunks);
    setProgress({ total: fileSize, uploaded: 0, percentage: 0 });

    // 开始上传分片
    uploadChunks();
  };

  return {
    handleUpload,
    chunks,
    progress,
    isUploading,
    errorMessage,
  };
};

export default useFileUploader;
