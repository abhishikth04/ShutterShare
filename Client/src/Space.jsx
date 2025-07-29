import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UploadImagesModal from "./UploadImagesModal"; // Modal to upload images
import { uploadToCloudinary } from "./uploadToCloudinary"; // 💡 Cloudinary upload helper

export default function Space() {
  const { id } = useParams();
  const [spaceData, setSpaceData] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchSpace();
  }, [id]);

  async function fetchSpace() {
    try {
      const res = await axios.get(`http://localhost:5000/api/spaces/${id}`);
      setSpaceData(res.data);
    } catch (err) {
      console.error("Failed to fetch space:", err);
    }
  }

  async function handleUpload() {
    if (selectedFiles.length === 0) return;

    setUploading(true);

    try {
      // Upload images to Cloudinary
      const uploadedImages = [];
      for (let file of selectedFiles) {
        const result = await UploadToCloudinary(file);
        uploadedImages.push({
          url: result.secure_url,
          filename: result.public_id,
        });
      }

      // Save image info to backend
      await axios.post(`http://localhost:5000/api/spaces/upload/${id}`, {
        images: uploadedImages,
      });

      setSelectedFiles([]);
      setShowUploadModal(false);
      fetchSpace(); // refresh
    } catch (err) {
      console.error("Error uploading images:", err);
    } finally {
      setUploading(false);
    }
  }

  if (!spaceData) return <div>Loading space details...</div>;

  const createdTime = new Date(spaceData.createdAt);
  const expiryTime = new Date(createdTime.getTime() + 5 * 60 * 60 * 1000);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">📸 {spaceData.name}</h1>
      <p className="text-gray-600">
        Join Code: <strong>{spaceData.publicCode}</strong>
      </p>
      <p className="text-gray-500">Description: {spaceData.description}</p>
      <p className="mt-2 text-red-600">
        🕒 Expires At: {expiryTime.toLocaleString()}
      </p>

      {/* Upload Section */}
      <div className="mt-6">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setSelectedFiles([...e.target.files])}
        />
        <button
          onClick={handleUpload}
          disabled={uploading || selectedFiles.length === 0}
          className={`ml-2 px-4 py-2 rounded text-white ${
            uploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {uploading ? "Uploading..." : "Upload Images"}
        </button>
      </div>

      {/* Image Gallery */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {spaceData.images &&
          spaceData.images.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={img.url}
                alt="uploaded"
                className="rounded shadow w-full h-48 object-cover"
              />
              <div className="absolute bottom-0 bg-black bg-opacity-50 text-white text-xs p-1 w-full text-center">
                Uploaded by: {img.uploadedBy?.name || "Unknown"}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
