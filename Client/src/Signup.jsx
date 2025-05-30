// src/Signup.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginBack from "./assets/LoginBack.jpg";

export default function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch("/api/auth/signup" , {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)

      });

      const data = await res.json();
      console.log(`Signup Response` , data);

      if(res.ok){
        alert("SignUp Successful !. Please Login");
      }else{
        alert(data.error || "Data Error. SignUp failed.");
      }


    } catch (err) {
      console.error("SignUp Error" , err);
      alert("Something went Wrong..");
    }

  };

  return (
    <div className="grid grid-cols-2">
      <div>
        <img src={LoginBack} alt="LoginBack" className="z-10" />
        <h2 className="z-1 text-6xl text-white ml-4.5 font-semibold drop-shadow-[1px_1px_4px_white]">
          Move the Moments
        </h2>
        <p className="text-gray-400 text-[20px] ml-4.5 mt-1.5">
          <i>Easily share your Memories. Make them accessible to your people anywhere around</i>
        </p>
      </div>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-800">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-700 p-8 rounded-xl shadow-lg w-full max-w-md space-y-6"
        >
          <h2 className="text-3xl font-semibold text-center text-white">Create an Account</h2>
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0d6183]"
          />
          <input
            name="email"
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0d6183]"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0d6183]"
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0d6183]"
          />
          <button
            type="submit"
            className="w-full bg-[#0d6183] text-white py-2 rounded-lg hover:bg-[#042431] transition"
          >
            Sign Up
          </button>
          <p className="text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-orange-700 underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
