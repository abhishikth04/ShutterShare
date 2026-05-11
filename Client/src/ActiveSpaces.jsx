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

  return (
    <div className="mt-10 px-4">

      <h2 className="text-2xl font-bold mb-5 text-gray-800">
        Your Active Spaces
      </h2>

      {spaces.length === 0 ? (

        <div className="text-gray-500">
          No active spaces yet.
        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {spaces.map((space) => (

            <div
              key={space._id}
              onClick={() => navigate(`/space/${space._id}`)}
              className="bg-white rounded-xl shadow-md p-5 cursor-pointer hover:scale-105 transition"
            >

              <h3 className="text-xl font-bold mb-2">
                {space.name}
              </h3>

              <p className="text-gray-600 mb-4">
                {space.description}
              </p>

              <div className="text-sm text-gray-500">
                Members: {space.members.length}
              </div>

              <div className="text-sm text-red-500 mt-1">
                Expires: {new Date(space.expiresAt).toLocaleString()}
              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}