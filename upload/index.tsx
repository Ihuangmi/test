import React, { useState, useRef, useCallback } from "react";
import { Upload, message } from "antd";
import { RcFile } from "antd/lib/upload/interface";
import { encryptChunk } from "./encryptionHelper"; // 假设这里有一个加密函数
import axios from "axios"; // 用于发送HTTP请求

const CHUNK_SIZE = 1024 * 1024; // 分片大小，这里是1MB
const CONCURRENT_UPLOADS = 3; // 并发上传数量

interface VideoUploaderProps {
  onUploadSuccess?: (fileURL: string) => void;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({ onUploadSuccess }) => {
  const [progress, setProgress] = useState<number[]>([]);
  const fileRef = useRef<RcFile | null>(null);

  const handleBeforeUpload = (file: RcFile) => {
    if (file.type !== "video/mp4") {
      message.error("只能上传MP4格式的视频");
      return false;
    }
    fileRef.current = file;
    return false; // 阻止默认上传行为，因为我们自己控制分片上传
  };

  const uploadChunk = useCallback(async (chunkIndex: number, chunk: Blob) => {
    try {
      const encryptedChunk = await encryptChunk(chunk); // 假设此函数返回加密后的Blob
      const formData = new FormData();
      formData.append("chunk", encryptedChunk, `video-${chunkIndex}.encrypted`);
      formData.append("chunkIndex", String(chunkIndex));
      // 发送HTTP请求上传分片
      const response = await axios.post("/api/upload-chunk", formData, {
        onUploadProgress: (event) => {
          const percentage = Math.round((event.loaded / event.total) * 100);
          setProgress((prevProgress) => {
            const newProgress = [...prevProgress];
            newProgress[chunkIndex] = percentage;
            return newProgress;
          });
        },
      });
      // 根据响应处理上传成功或失败的逻辑
      console.log(response.data);
    } catch (error) {
      console.error("上传分片失败", error);
    }
  }, []);

  const startUpload = async () => {
    if (!fileRef.current) return;

    const file = fileRef.current as Blob;
    const chunks = Math.ceil(file.size / CHUNK_SIZE);
    const chunkPromises: Promise<any>[] = [];

    for (let i = 0; i < chunks; i++) {
      const start = i * CHUNK_SIZE;
      const end = start + CHUNK_SIZE;
      const chunk = file.slice(start, end);
      chunkPromises.push(uploadChunk(i, chunk));

      // 控制并发数
      if (i >= CONCURRENT_UPLOADS) {
        await Promise.race(chunkPromises.splice(0, CONCURRENT_UPLOADS - 1));
      }
    }

    // 等待所有分片上传完成
    await Promise.all(chunkPromises);

    // 所有分片上传完毕后，通知服务器合并分片（此处需实现相应的后端逻辑）
    try {
      const mergeResponse = await axios.post("/api/merge-chunks");
      if (onUploadSuccess && mergeResponse.data.url) {
        onUploadSuccess(mergeResponse.data.url);
      }
    } catch (error) {
      console.error("合并分片失败", error);
    }
  };

  return (
    <>
      <Upload.Dragger beforeUpload={handleBeforeUpload}>
        <p className="ant-upload-drag-icon">
          <inboxOutlined />
        </p>
        <p className="ant-upload-text">点击或将文件拖拽到这里上传</p>
        <p className="ant-upload-hint">支持单个MP4视频上传</p>
      </Upload.Dragger>
      <button onClick={startUpload}>开始上传</button>
      {/* 可以在这里根据需要展示上传进度 */}
    </>
  );
};

export default VideoUploader;
