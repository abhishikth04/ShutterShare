import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ActiveSpaces() {

  const [spaces, setSpaces] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchSpaces();
  }, []);

  const fetchSpaces = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/spaces/my-spaces",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSpaces(res.data);

    } catch (error) {

      console.error("Failed to fetch spaces:", error);
    }
  };

  const getTimeLeft = (expiresAt) => {

    const now = new Date().getTime();

    const expiry = new Date(expiresAt).getTime();

    const difference = expiry - now;

    if (difference <= 0) return "Expired";

    const hours = Math.floor(
      difference / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
      (difference % (1000 * 60 * 60)) /
      (1000 * 60)
    );

    return `${hours}h ${minutes}m left`;
  };

  return (

    <div className="mt-16 px-4">

      {/* Section Title */}
      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-4xl font-semibold text-white tracking-tight">
            Active Spaces
          </h2>

          <p className="text-gray-500 mt-2">
            Continue collaborating on shared memories
          </p>

        </div>

      </div>

      {/* Empty State */}
      {spaces.length === 0 ? (

        <div className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-3xl p-10 text-center">

          <p className="text-gray-400 text-lg">
            No active spaces yet ✨
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {spaces.map((space, index) => {

            const previewImage =
              space.images?.[0]?.url;

            return (

              <div
                key={space._id}
                onClick={() => navigate(`/space/${space._id}`)}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl cursor-pointer hover:scale-[1.02] transition duration-500"
              >

                {/* Preview Image */}
                <div className="h-56 overflow-hidden">

                  {previewImage ? (

                    <img
                      src={previewImage}
                      alt="preview"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                    />

                  ) : (

                    <div className="w-full h-full flex items-center justify-center bg-black/30 text-gray-500 text-lg">
                      No Preview
                    </div>

                  )}

                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-transparent to-transparent pointer-events-none" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-5">

                  {/* Countdown Badge */}
                  <div className="inline-flex items-center bg-red-500/20 border border-red-500/30 text-red-300 text-xs px-3 py-1 rounded-full mb-3 backdrop-blur-md">

                    ⏳ {getTimeLeft(space.expiresAt)}

                  </div>

                  {/* Space Name */}
                  <h3 className="text-2xl font-semibold text-white">

                    {space.name}

                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 text-sm mt-2 line-clamp-2">

                    {space.description}

                  </p>

                  {/* Bottom Row */}
                  <div className="flex items-center justify-between mt-5 text-sm text-gray-400">

                    <span>
                      👥 {space.members.length} members
                    </span>

                    <span className="font-mono text-blue-300">
                      {space.publicCode}
                    </span>

                  </div>

                </div>

              </div>

            );
          })}

        </div>

      )}

    </div>
  );
}