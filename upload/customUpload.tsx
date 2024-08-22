import React, { useState } from "react";
import { Upload, message } from "antd";
import { RcFile, UploadChangeParam } from "antd/lib/upload";
import SparkMD5 from "spark-md5";

// 定义分片的大小，例如每个分片5MB
const CHUNK_SIZE = 5 * 1024 * 1024;
// 上传失败自动重试次数
const RETRY_TIMES = 3;

interface IChunk {
  file: Blob;
  index: number;
  md5: string;
}

const CustomUpload: React.FC = () => {
  const [uploading, setUploading] = useState(false);

  // 限制并发上传的分片数量
  const MAX_CONCURRENT_UPLOADS = 6;

  /**
   * 异步任务并发控制执行
   * @param poolLimit 并发数量
   * @param array 异步请求参数数组
   * @param iteratorFn 异步请求函数，参数为array数组项
   * @returns
   */
  async function asyncPool(
    poolLimit: number,
    array: any[],
    iteratorFn: (params: any) => Promise<any>
  ) {
    const taskPool: Promise<any>[] = []; // 任务池
    const executing: Promise<any>[] = []; // 执行池

    for (const item of array) {
      /** 创建任务 */
      const task = Promise.resolve().then(() => iteratorFn(item));
      taskPool.push(task);

      // 需要执行的数组总长度大于限制数量poolLimit，进行并发限制
      if (poolLimit <= array.length) {
        // 等请求结束后，再执行then里的回调，把任务从executing执行池中移除
        const exitPool: Promise<any> = task.then(() => {
          executing.splice(executing.indexOf(exitPool), 1);
        });
        executing.push(exitPool);

        // 正在执行的并发请求数量大于限制时，等待当前最快的一个请求完成
        if (executing.length >= poolLimit) {
          await Promise.race(executing);
        }
      }
    }

    return Promise.all(taskPool);
  }

  /**
   * 处理文件上传
   * @param file
   * @returns
   */
  const handleUpload = async (file: RcFile) => {
    const chunkList: IChunk[] = await createChunks(file);

    // 使用 asyncPool 控制分片上传的并发
    await asyncPool(MAX_CONCURRENT_UPLOADS, chunkList, uploadChunk);

    // 所有分片上传完成后，你可能需要发送一个请求来合并这些分片
    await mergeChunks(file.name);
  };

  // 创建文件分片并计算MD5
  const createChunks = async (file: RcFile): Promise<IChunk[]> => {
    const chunks: IChunk[] = [];
    let cur = 0;
    let index = 0;

    while (cur < file.size) {
      const chunk = file.slice(cur, cur + CHUNK_SIZE) as Blob;
      const md5 = await computeMD5(chunk);
      chunks.push({ file: chunk, index, md5 });
      cur += CHUNK_SIZE;
      index += 1;
    }

    return chunks;
  };

  // 计算分片的MD5值
  const computeMD5 = (blob: Blob): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(blob);
      reader.onload = function (event) {
        const spark = new SparkMD5.ArrayBuffer();
        spark.append(event.target!.result as ArrayBuffer);
        const md5 = spark.end();
        resolve(md5);
      };
    });
  };

  // 发送请求，上传分片到服务器
  const uploadChunk = async (chunk: IChunk) => {
    /** 当前分片重试次数 */
    let retry = 0;
    const formData = new FormData();
    formData.append("file", chunk.file);
    formData.append("index", chunk.index.toString());
    formData.append("md5", chunk.md5);

    // 模拟发送请求到服务器
    await new Promise((resolve, reject) => {
      // 使用 XMLHttpRequest 或 fetch API 发送 formData 到服务器
      console.log(`Uploading chunk #${chunk.index}: MD5 ${chunk.md5}`);
      // 假设服务器端响应为 { status: 'ok' }
      const response = { status: "ok" };
      if (response.status === "ok") {
        resolve(response);
      } else {
        if (RETRY_TIMES && retry < RETRY_TIMES) {
          retry += 1;
          uploadChunk(chunk);
        } else {
          reject(new Error("Upload failed"));
        }
      }
    });
  };

  // 分片上传完成后告诉服务器合并分片
  const mergeChunks = async (fileName: string) => {
    // 发送合并请求到服务器
    console.log(`Requesting server to merge chunks for file: ${fileName}`);
    // 模拟服务器合并操作
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  // antd的Upload组件onChange事件处理
  const handleChange = async (info: UploadChangeParam) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  // 自定义请求方法
  const customRequest = async ({ file, onSuccess, onError }) => {
    try {
      setUploading(true);
      await handleUpload(file as RcFile);
      onSuccess("ok", file);
      message.success(`${file.name} file uploaded successfully`);
    } catch (e) {
      console.error(e);
      onError(e);
      message.error(`${file.name} file upload failed.`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Upload
      customRequest={customRequest}
      onChange={handleChange}
      beforeUpload={() => !uploading} // 如果正在上传，则不再接受新文件
      multiple={false}
      showUploadList={false}
    >
      <button disabled={uploading}>Click to Upload</button>
    </Upload>
  );
};

export default CustomUpload;
