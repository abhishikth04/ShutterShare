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

        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-2xl px-8 py-8">

  {/* Soft Glow */}
  <div className="absolute top-0 left-0 w-48 h-48 bg-blue-500/10 blur-3xl rounded-full" />

  <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500/10 blur-3xl rounded-full" />

  {/* Content */}
  <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">

    {/* Left */}
    <div>

      <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight">

        Welcome back,
        <span className="ml-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">

          {userName || "Creator"}

        </span>

      </h1>

      <p className="text-gray-400 mt-3 text-base md:text-lg">

        Continue building and sharing beautiful memories.

      </p>

    </div>

    

  </div>

</div>

        <CreateJoin />

        <ActiveSpaces />

        <ExploreCarousel />

      </main>

    </div>
  );
}