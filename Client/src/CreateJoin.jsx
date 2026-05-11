import { useState } from "react";
import CreateSpaceModal from "./CreateSpaceModal";
import JoinSpaceModal from "./JoinSpaceModal";
import { useNavigate } from "react-router-dom";

const options = [
  {
    title: "Join a Space",
    image: "./src/assets/SharedGallery.jpg",
    color: "from-pink-400 to-red-400",
    action: "join",
  },
  {
    title: "Create a Space",
    image: "./src/assets/CreateJoin.jpg",
    color: "from-green-400 to-blue-500",
    action: "create",
  },
  {
    title: "Your Personal Space",
    image: "./src/assets/CreatorHub.jpg",
    color: "from-purple-400 to-indigo-500",
    action: "personal",
  },
];

export default function CreateJoin() {

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);

  const navigate = useNavigate();

  const handleClick = (action) => {

    if (action === "create") {

      setShowCreateModal(true);

    } else if (action === "join") {

      setShowJoinModal(true);

    } else {

      alert("Personal Space coming soon ✨");

    }
  };

  // After creating a space
  const handleSpaceCreated = (space) => {

    console.log("✅ Space created:", space);

    navigate(`/space/${space._id}`);
  };

  // After joining a space
  const handleSpaceJoined = (space) => {

    console.log("✅ Joined space:", space);

    navigate(`/space/${space._id}`);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-9 mx-4 mt-4">

        {options.map((opt, i) => (

          <div
            key={i}
            className={`rounded-xl shadow-lg p-5 bg-gradient-to-r ${opt.color} text-white hover:scale-105 transition cursor-pointer`}
            onClick={() => handleClick(opt.action)}
          >

            <img
              src={opt.image}
              alt={opt.title}
              className="rounded-md h-40 w-full object-cover mb-4"
            />

            <h2 className="text-xl font-bold">
              {opt.title}
            </h2>

          </div>

        ))}

      </div>

      {/* Create Space Modal */}
      {showCreateModal && (
        <CreateSpaceModal
          onClose={() => setShowCreateModal(false)}
          onCreated={handleSpaceCreated}
        />
      )}

      {/* Join Space Modal */}
      {showJoinModal && (
        <JoinSpaceModal
          onClose={() => setShowJoinModal(false)}
          onJoined={handleSpaceJoined}
        />
      )}
    </>
  );
}