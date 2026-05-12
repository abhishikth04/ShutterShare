import React, { useState } from "react";
import axios from "axios";

const UploadImagesModal = ({
  spaceId,
  onClose,
  onUploadComplete,
}) => {

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {

    setSelectedFiles([
      ...selectedFiles,
      ...Array.from(e.target.files),
    ]);
  };

  const removeFile = (indexToRemove) => {

    const updatedFiles = selectedFiles.filter(
      (_, index) => index !== indexToRemove
    );

    setSelectedFiles(updatedFiles);
  };

  const handleUpload = async () => {

    if (selectedFiles.length === 0) return;

    setUploading(true);

    const token = localStorage.getItem("token");

    try {

      for (const file of selectedFiles) {

        const formData = new FormData();

        formData.append("image", file);

        await axios.post(
          `http://localhost:5000/api/spaces/${spaceId}/upload`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      onUploadComplete();

      onClose();

    } catch (error) {

      console.error("Error uploading images:", error);

      alert("Upload failed. Please try again.");

    } finally {

      setUploading(false);
    }
  };

  return (

    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50 px-4">

      <div className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 w-full max-w-2xl text-white shadow-2xl">

        {/* Title */}
        <h2 className="text-3xl font-semibold mb-6 text-center tracking-tight">
          Upload Memories
        </h2>

        {/* Upload Area */}
        <label
          className="flex flex-col items-center justify-center border-2 border-dashed border-white/20 rounded-3xl h-52 cursor-pointer hover:border-blue-400 transition duration-300 bg-white/5"
        >

          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="text-5xl mb-4">
            📸
          </div>

          <p className="text-lg text-gray-300">
            Click to choose photos
          </p>

          <p className="text-sm text-gray-500 mt-2">
            JPG, PNG supported
          </p>

        </label>

        {/* Preview Section */}
        {selectedFiles.length > 0 && (

          <div className="mt-6">

            <div className="flex justify-between items-center mb-4">

              <p className="text-gray-300 text-sm">
                {selectedFiles.length} file(s) selected
              </p>

            </div>

            {/* Preview Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-72 overflow-y-auto pr-1">

              {selectedFiles.map((file, index) => (

                <div
                  key={index}
                  className="relative group"
                >

                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="w-full h-28 object-cover rounded-2xl border border-white/10"
                  />

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFile(index)}
                    className="absolute top-2 right-2 bg-black/70 hover:bg-red-500 transition text-white w-7 h-7 rounded-full text-sm opacity-0 group-hover:opacity-100"
                  >
                    ×
                  </button>

                </div>

              ))}

            </div>

          </div>

        )}

        {/* Buttons */}
        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            disabled={uploading}
            className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleUpload}
            disabled={uploading || selectedFiles.length === 0}
            className="px-6 py-2 rounded-full bg-white text-black hover:scale-105 transition font-medium"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default UploadImagesModal;