import { FaUserCircle } from "react-icons/fa";
import { SendHorizontal } from "lucide-react";

export default function DashNav(){
    return(

        <nav className="bg-black shadow-lg px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      {/* Logo */}
      <div className="text-2xl font-bold text-indigo-600 flex flex-row">
        ShutterShare <SendHorizontal/>
      </div>

      {/* Search Bar */}
      <div className="flex-1 mx-6 text-white">
        <input
          type="text"
          placeholder="Search spaces or content..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
        />
      </div>

      {/* Profile Icon */}
      <div className="relative">
        <FaUserCircle className="text-3xl text-gray-600 cursor-pointer hover:text-indigo-700" />
        {/* Future: Add dropdown here on click */}
      </div>
    </nav>
    )
}