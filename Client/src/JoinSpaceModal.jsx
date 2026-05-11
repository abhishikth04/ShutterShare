import React, { useState } from "react";
import axios from "axios";

export default function JoinSpaceModal({ onClose, onJoined }) {
  const [publicCode, setPublicCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleJoin = async () => {
    if (!publicCode.trim()) {
      alert("Please enter a code");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await axios.post(
        "http://localhost:5000/api/spaces/join",
        {
          publicCode,
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Joined space:", res.data);

      onJoined(res.data.space);

      onClose();

    } catch (error) {
      console.error("Join Space Error:", error);

      alert(
        error.response?.data?.message || "Failed to join space"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">

        <h2 className="text-2xl font-bold mb-4 text-center">
          Join a Space
        </h2>

        <input
          type="text"
          placeholder="Enter Public Code"
          value={publicCode}
          onChange={(e) => setPublicCode(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <div className="flex justify-end gap-2">

          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleJoin}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            {loading ? "Joining..." : "Join"}
          </button>

        </div>
      </div>
    </div>
  );
}