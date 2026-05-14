import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UploadImagesModal from "./UploadImagesModal";

export default function Space() {

  const { id } = useParams();

  const [spaceData, setSpaceData] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [timeLeft, setTimeLeft] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchSpace();
  }, [id]);

  useEffect(() => {

  if (!spaceData?.expiresAt) return;

  const interval = setInterval(() => {

    const now = new Date().getTime();

    const expiry = new Date(spaceData.expiresAt).getTime();

    const difference = expiry - now;

    if (difference <= 0) {

      setTimeLeft("Expired");

      clearInterval(interval);

      return;
    }

    const hours = Math.floor(
      difference / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
      (difference % (1000 * 60 * 60)) /
      (1000 * 60)
    );

    const seconds = Math.floor(
      (difference % (1000 * 60)) / 1000
    );

    setTimeLeft(
      `${hours}h ${minutes}m ${seconds}s`
    );

  }, 1000);

  return () => clearInterval(interval);

}, [spaceData]);

  async function fetchSpace() {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/api/spaces/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSpaceData(res.data);

    } catch (err) {

      console.error("Failed to fetch space:", err);
    }
  }

  const copyCode = async () => {

  try {

    await navigator.clipboard.writeText(
      spaceData.publicCode
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);

  } catch (err) {

    console.error("Failed to copy code:", err);
  }
};

  if (!spaceData) {

    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-2xl">
        Loading Space...
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-blue-500/10 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center pt-20 px-6">

        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-center">
          {spaceData.name}
        </h1>

        <p className="text-gray-400 mt-4 text-center text-lg md:text-xl max-w-2xl leading-relaxed">
          {spaceData.description}
        </p>

        {/* Metadata */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">

          <div
            className="group bg-white/5 border border-white/10 backdrop-blur-lg px-5 py-3 rounded-full text-lg text-gray-300 flex items-center gap-4 relative"
          >

            {/* Label */}
            <span className="text-gray-400 text-base">
              Public Code
            </span>

            {/* Code */}
            <span className="font-mono text-blue-400 text-xl tracking-wide">
              {spaceData.publicCode}
            </span>

            {/* Copy Button */}
            <button
              onClick={copyCode}
              className="text-sm hover:scale-110 transition"
            >
              {copied ? "✅" : "📋"}
            </button>

            {/* Hover Tooltip */}
            <div
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none whitespace-nowrap"
            >
              {copied ? "Copied!" : "Click to copy code"}
            </div>

          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-lg px-5 py-3 rounded-full text-lg text-gray-300">
            Members:
            <span className="ml-2 text-white">
              {spaceData.members.length}
            </span>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-lg px-5 py-3 rounded-full text-lg text-gray-300">
            Expires In:
            <span className="ml-2 text-red-400 font-semibold">
              {timeLeft}
            </span>
          </div>

        </div>

      </div>

      {/* Gallery */}
      <div className="relative z-10 mt-20 px-6 pb-24">

        {spaceData.images?.length > 0 ? (

          <div className="columns-1 sm:columns-2 md:columns-3 gap-5 space-y-5">

            {spaceData.images.map((img, index) => (

              <div
                key={index}
                onClick={() => setSelectedImage(img)}
                className="relative overflow-hidden rounded-3xl group break-inside-avoid cursor-pointer"
              >

                <img
                  src={img.url}
                  alt="uploaded"
                  className="w-full object-cover rounded-3xl transition duration-500 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

                {/* Uploader */}
                <div className="absolute bottom-0 left-0 w-full p-4 opacity-0 group-hover:opacity-100 transition duration-500">

                  <p className="text-sm text-gray-300">
                    Uploaded by
                  </p>

                  <h3 className="text-lg font-semibold">
                    {img.uploadedBy?.name || "Unknown"}
                  </h3>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <div className="flex items-center justify-center h-64 border border-dashed border-white/10 rounded-3xl bg-white/5 backdrop-blur-lg">

            <p className="text-gray-500 text-lg">
              No memories uploaded yet ✨
            </p>

          </div>

        )}

      </div>

      {/* Floating Upload Button */}
      <button
        onClick={() => setShowUploadModal(true)}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-white text-black text-3xl font-light shadow-2xl hover:scale-110 transition duration-300 z-50"
      >
        +
      </button>

      {/* Upload Modal */}
      {showUploadModal && (
        <UploadImagesModal
          spaceId={spaceData._id}
          onClose={() => setShowUploadModal(false)}
          onUploadComplete={fetchSpace}
        />
      )}

      {/* Fullscreen Image Viewer */}
      {selectedImage && (

        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100] flex items-center justify-center p-6"
          onClick={() => setSelectedImage(null)}
        >

          {/* Close Button */}
          <button
            className="absolute top-6 right-6 text-white text-4xl hover:scale-110 transition"
          >
            ×
          </button>

          <div
            className="max-w-6xl max-h-[90vh] relative"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Action Buttons */}
            <div className="absolute top-4 left-4 flex gap-3 z-10">

              {/* Download */}
              <a
                href={selectedImage.url}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-xl border border-white/10 hover:bg-white/20 transition px-4 py-2 rounded-full text-white text-sm"
              >
                ⬇ Download
              </a>

              {/* Future Like Button */}
              <button
                className="bg-white/10 backdrop-blur-xl border border-white/10 hover:bg-white/20 transition px-4 py-2 rounded-full text-white text-sm"
              >
                ♡ Like
              </button>

            </div>

            {/* Image */}
            <img
              src={selectedImage.url}
              alt="fullscreen"
              className="max-h-[85vh] rounded-3xl shadow-2xl object-contain"
            />

            {/* Metadata */}
            <div className="mt-4 text-center">

              <p className="text-gray-400 text-sm">
                Uploaded by
              </p>

              <h3 className="text-white text-xl font-semibold">
                {selectedImage.uploadedBy?.name || "Unknown"}
              </h3>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}