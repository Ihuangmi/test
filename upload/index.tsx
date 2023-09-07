import React, { useState } from "react";
import useFileUploader from "./useFileUploader";

const MyComponent = () => {
  const [file, setFile] = useState<File | null>(null);
  const { handleUpload, isUploading, isComplete, progress, errorMessage } =
    useFileUploader(uploadFunction);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      handleUpload(selectedFile);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {isUploading && <div>上传中...</div>}
      {isComplete && <div>上传成功！</div>}
      {errorMessage && <div>上传失败：{errorMessage}</div>}
      <progress value={progress.percentage} max="100" />
    </div>
  );
};
