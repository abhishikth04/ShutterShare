
import { useState } from "react";
import axios from "axios";

export default function CreateSpaceModal({ onClose, onCreated = () => {} }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  if (!userId || !token) {
    alert("Missing user or token. Please login again.");
    return;
  }

  const data = {
    name,
    description,
    creatorId: userId, // ✅ FIXED TYPING
  };

  console.log("Sending request with:", data, "Token:", token);

  try {
    const res = await axios.post("http://localhost:5000/api/spaces/create", data, {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Token should ONLY go here
      },
    });

    onCreated(res.data.space);
    onClose();
  } catch (err) {
    console.error("Create Space Error:", err);
    console.error("Error Response Data:", err.response?.data);
    alert("Error: " + (err.response?.data?.message || "Something went wrong."));
  }
};


  return (
    <div className="fixed inset-0 backdrop-blur-xl flex items-center justify-center z-50 min-h-screen">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[93%] max-w-md">
        <h2 className="text-3xl font-semibold mb-4">Create a New Space</h2>
        <input
          type="text"
          placeholder="Space Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-3 border rounded font-semibold"
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-4 border rounded font-semibold"
        />
        <div className="flex justify-end gap-3">
          <button
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
