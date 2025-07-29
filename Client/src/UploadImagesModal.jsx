import React, { useState } from "react";
import { uploadToCloudinary } from "./uploadToCloudinary";

const UploadImagesModal = ({ onClose, onUploadComplete }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const uploadedUrls = [];

      for (const file of selectedFiles) {
        const url = await uploadToCloudinary(file);
        uploadedUrls.push(url);
      }

      // Pass uploaded image URLs to parent
      onUploadComplete(uploadedUrls);
      onClose(); // close modal
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Upload Images</h2>
        <input type="file" multiple onChange={handleFileChange} />
        <div className="mt-4 flex justify-end">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
            onClick={onClose}
            disabled={uploading}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleUpload}
            disabled={uploading || selectedFiles.length === 0}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadImagesModal;
