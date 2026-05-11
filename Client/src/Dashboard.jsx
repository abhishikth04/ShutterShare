import DashNav from './DashNav';
import CreateJoin from './CreateJoin';
import ExploreCarousel from './ExploreCarousel';
import ActiveSpaces from './ActiveSpaces';

import { useEffect, useState } from "react";

export default function Dashboard() {

  const [userName , setUsername] = useState("");

  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    try {

      if (storedUser) {

        const parsedUser = JSON.parse(storedUser);

        if (parsedUser && parsedUser.name) {

          setUsername(parsedUser.name);

        } else {

          console.warn("User object malformed:", parsedUser);
        }
      }

    } catch (err) {

      console.error("Error parsing user from localStorage:", err);
    }

  }, []);

  return (

    <div className="bg-gray-950 min-h-screen">

      <DashNav />

      <main className="p-6 space-y-10">

        <h2 className='text-gray-100 text-5xl ml-4 mt-3 font-semibold drop-shadow-[1px_1px_6px_grey]'>

          <i>
            Welcome{userName ? `, ${userName}` : ""}
          </i>

        </h2>

        <CreateJoin />

        <ActiveSpaces />

        <ExploreCarousel />

      </main>

    </div>
  );
}