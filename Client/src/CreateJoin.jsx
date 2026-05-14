import { useState } from "react";
import CreateSpaceModal from "./CreateSpaceModal";
import JoinSpaceModal from "./JoinSpaceModal";
import { useNavigate } from "react-router-dom";

const options = [
  {
    title: "Join a Space",
    subtitle: "Collaborate and contribute to shared memories",
    image: "./src/assets/SharedGallery.jpg",
    glow: "from-pink-500/30 to-red-500/10",
    action: "join",
  },
  {
    title: "Create a Space",
    subtitle: "Start a new collaborative gallery experience",
    image: "./src/assets/CreateJoin.jpg",
    glow: "from-blue-500/30 to-cyan-500/10",
    action: "create",
  },
  {
    title: "Your Personal Space",
    subtitle: "A private place for your own moments",
    image: "./src/assets/CreatorHub.jpg",
    glow: "from-purple-500/30 to-indigo-500/10",
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

  const handleSpaceCreated = (space) => {

    navigate(`/space/${space._id}`);
  };

  const handleSpaceJoined = (space) => {

    navigate(`/space/${space._id}`);
  };

  return (

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 mt-10">

      {options.map((opt, i) => (

        <div
          key={i}
          onClick={() => handleClick(opt.action)}
          className="group relative overflow-hidden rounded-[2rem] h-[420px] cursor-pointer border border-white/10"
        >

          {/* Background Image */}
          <img
            src={opt.image}
            alt={opt.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/70 group-hover:bg-black/60 transition duration-500" />

          {/* Glow */}
          <div className={`absolute inset-0 bg-gradient-to-br ${opt.glow} opacity-80`} />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-end p-8">

            {/* Small Label */}
            <div className="mb-4">

              <span className="bg-white/10 backdrop-blur-xl border border-white/10 text-white text-xs px-4 py-2 rounded-full tracking-wide">

                SHUTTERSHARE

              </span>

            </div>

            {/* Title */}
            <h2 className="text-4xl font-semibold text-white leading-tight">

              {opt.title}

            </h2>

            {/* Subtitle */}
            <p className="text-gray-300 mt-4 text-base leading-relaxed max-w-xs">

              {opt.subtitle}

            </p>

            {/* Bottom CTA */}
            <div className="mt-8 flex items-center gap-3 text-white/80 group-hover:text-white transition">

              <span className="text-sm tracking-wide">
                Open
              </span>

              <span className="text-xl group-hover:translate-x-1 transition">
                →
              </span>

            </div>

          </div>

        </div>

      ))}

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

    </div>
  );
}