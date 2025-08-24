import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UploadImagesModal from "./UploadImagesModal";

export default function Space() {
  const { id } = useParams();
  const [spaceData, setSpaceData] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    fetchSpace();
  }, [id]);

  async function fetchSpace() {
    try {
      const token = localStorage.getItem("token"); // ✅ grab token from localStorage

      const res = await axios.get(`http://localhost:5000/api/spaces/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ send token to backend
        },
      });

      setSpaceData(res.data);
    } catch (err) {
      console.error("Failed to fetch space:", err);
    }
  }

  if (!spaceData) return <div className="text-center mt-10">Loading space details...</div>;

  return (
    <div className="min-h-screen bg-black p-6 flex flex-col items-center">
      {/* Title */}
      <h1 className="text-6xl font-semibold text-gray-100 mb-3 text-center drop-shadow-[2px_2px_2px_white]">
        <i>{spaceData.name}</i>
      </h1>

      {/* Description */}
      <p className="text-gray-400 mb-6 text-center max-w-xl text-2xl">{spaceData.description}</p>

      {/* Public code & expiry */}
      <div className="w-full flex justify-between px-10 mb-10">
        <span className="text-lg font-medium text-gray-500">
          Public Code: <span className="font-mono text-blue-600 font-semibold text-2xl">{spaceData.publicCode}</span>
        </span>
        <span className="text-lg font-medium text-gray-500">
          Expires At:{" "}
          <span className="text-red-500">
            {new Date(spaceData.expiresAt).toLocaleString()}
          </span>
        </span>
      </div>

      {/* Gallery */}
      <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-3 gap-4">
        {spaceData.images?.length > 0 ? (
          spaceData.images.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={img.url}
                alt="uploaded"
                className="rounded-lg shadow-md w-full h-48 object-cover"
              />
              <div className="absolute bottom-0 bg-black bg-opacity-50 text-white text-xs p-1 w-full text-center rounded-b-lg">
                Uploaded by: {img.uploadedBy?.name || "Unknown"}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full border-2 border-dashed border-gray-300 rounded-lg h-40 flex items-center justify-center text-gray-400">
            No images yet
          </div>
        )}
      </div>

      {/* Upload Button (bottom right fixed) */}
      <button
        onClick={() => setShowUploadModal(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-full shadow-lg"
      >
        + Upload
      </button>

      {/* Upload Modal */}
      {showUploadModal && (
        <UploadImagesModal
          spaceId={spaceData._id}
          onClose={() => setShowUploadModal(false)}
          onUploadComplete={fetchSpace} // refresh after upload
        />
      )}
    </div>
  );
}
