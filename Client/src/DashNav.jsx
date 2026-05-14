import { FaUserCircle } from "react-icons/fa";
import { SendHorizontal, Search } from "lucide-react";

export default function DashNav() {

  const storedUser = JSON.parse(
    localStorage.getItem("user")
  );

  return (

    <div className="sticky top-0 z-50 px-4 pt-4">

      <nav className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl px-6 py-4 flex items-center justify-between shadow-2xl">

        {/* Logo */}
        <div className="flex items-center gap-2">

          <div className="text-3xl font-semibold text-white tracking-tight flex items-center gap-2">

            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              ShutterShare
            </span>

            <SendHorizontal
              className="text-blue-400"
              size={22}
            />

          </div>

        </div>

        {/* Search */}
        <div className="hidden md:flex flex-1 mx-10">

          <div className="relative w-full">

            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />

            <input
              type="text"
              placeholder="Search spaces..."
              className="w-full bg-black/30 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-400 transition"
            />

          </div>

        </div>

        {/* Profile */}
        <div className="flex items-center gap-4">

          {/* Username */}
          <div className="hidden sm:flex flex-col text-right">

            <span className="text-sm text-gray-400">
              Logged in as
            </span>

            <span className="text-white font-medium">
              {storedUser?.name || "User"}
            </span>

          </div>

          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/20 transition cursor-pointer">

            <FaUserCircle className="text-3xl text-gray-300" />

          </div>

        </div>

      </nav>

    </div>
  );
}