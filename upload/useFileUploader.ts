import { useState, useEffect } from "react";
import axios from "axios";

interface Chunk {
  chunk: Blob;
  index: number;
  start: number;
  end: number;
  uploaded: boolean;
}

interface Progress {
  total: number;
  uploaded: number;
  percentage: number;
}

interface UploadData {
  file: File;
  chunk: Blob;
  index: number;
}

interface UploadResponse {
  data: {
    url: string;
  };
}

interface UploadInfo {
  url: string;
  token: string;
}

interface Options {
  concurrency?: number;
}

const DEFAULT_CONCURRENCY = 4;

const useFileUploader = (
  uploadFunction: (data: UploadData) => Promise<UploadResponse>,
  options: Options = {}
) => {
  const [chunks, setChunks] = useState<Chunk[]>([]);
  const [progress, setProgress] = useState<Progress>({
    total: 0,
    uploaded: 0,
    percentage: 0,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadInfo, setUploadInfo] = useState<UploadInfo | null>(null);

  // 获取上传token
  const getUploadInfo = async (): Promise<void> => {
    try {
      const response = await axios.get("/getUploadInfo");
      setUploadInfo({
        url: response.data.url,
        token: response.data.token,
      });
    } catch (error) {
      setErrorMessage(error.message || "获取上传信息失败");
    }
  };

  // 文件分片
  const generateChunks = (file: File, chunkSize: number): Chunk[] => {
    const chunks: Chunk[] = [];
    let start = 0;
    let index = 0;

    while (start < file.size) {
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);
      chunks.push({ chunk, index, start, end: end - 1, uploaded: false });
      start = end;
      index++;
    }

    return chunks;
  };

  // 上传分片文件
  const uploadChunks = async () => {
    const concurrency = options.concurrency || DEFAULT_CONCURRENCY;
    const chunksCopy = [...chunks];
    let uploadingChunks = chunksCopy.splice(0, concurrency);

    while (uploadingChunks.length > 0) {
      const promises = uploadingChunks.map((chunk) => {
        const data = { file, chunk, index };
        const promise = uploadFunction(data).then((response) => {
          setChunks((prevChunks) =>
            prevChunks.map((prevChunk) =>
              prevChunk.index === chunk.index
                ? { ...prevChunk, uploaded: true }
                : prevChunk
            )
          );
          return response;
        });

        return promise;
      });

      const results = await Promise.race(promises);
      console.log(results);
      setIsUploading(false);

      uploadingChunks = chunksCopy.splice(0, concurrency - promises.length);
    }

    setIsComplete(true);
  };

  // 开始准备上传
  const handleUpload = async (file: File) => {
    setChunks([]);
    setProgress({ total: 0, uploaded: 0, percentage: 0 });
    setIsUploading(false);
    setIsComplete(false);
    setErrorMessage("");
    setUploadInfo(null);

    await getUploadInfo();

    if (uploadInfo === null) {
      setIsUploading(false);
      return;
    }

    const { url, token } = uploadInfo;
    const chunkSize = 1024 * 1024;
    const chunks = generateChunks(file, chunkSize);
    const total = chunks.length;

    setChunks(chunks);
    setProgress({ total, uploaded: 0, percentage: 0 });
    setIsUploading(true);

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      if (!chunk.uploaded) {
        const start = chunk.start;
        const end = chunk.end;
        const chunkData = file.slice(start, end + 1);
        const formData = new FormData();
        formData.append("file", chunkData);
        formData.append("index", chunk.index.toString());
        formData.append("token", token);

        try {
          const response = await axios.post(url, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
              const uploaded = start + progressEvent.loaded;
              setChunks((prevChunks) =>
                prevChunks.map((prevChunk) =>
                  prevChunk.index === chunk.index
                    ? { ...prevChunk, uploaded: uploaded === end + 1 }
                    : prevChunk
                )
              );
              const uploadedCount = chunks.filter((c) => c.uploaded).length;
              const percentage = (uploadedCount / total) * 100;
              setProgress({ total, uploaded: uploadedCount, percentage });
            },
          });

          console.log(response);
        } catch (error) {
          console.error(error);
          setErrorMessage(error.message);
          setIsUploading(false);
          return;
        }
      }
    }

    await uploadChunks();
  };

  return { handleUpload, isUploading, isComplete, progress, errorMessage };
};

export default useFileUploader;
