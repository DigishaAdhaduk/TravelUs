import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png"; //logo 

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="flex h-screen text-white font-sans">
      {/* Left Side */}
      <div className="w-1/2 bg-[#192166]/10 flex flex-col justify-center items-center px-20">
        <img src={Logo} alt="TravelUs Logo" className="h-16 mb-6" />
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-2 text-white">Welcome</h1>
          <p className="text-3xl font-semibold mb-6 text-white">to TravelUs!</p>
          <p className="text-lg leading-relaxed max-w-md text-white">
            Your All-in-One Group Travel Planner. <br />
            From Itineraries to Expenses — We've Got Your Trip Covered.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 bg-[#192166] flex justify-center items-center px-20">
        <form className="w-full max-w-md flex flex-col gap-5">
          <h2 className="text-4xl font-bold text-center mb-2 text-white">Signup</h2>

          <input
            type="email"
            placeholder="Email"
            className="px-5 py-3 rounded-[10px] bg-[#525c9c] text-white placeholder-white outline-none"
          />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create Password"
            className="px-5 py-3 rounded-[10px] bg-[#525c9c] text-white placeholder-white outline-none"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full px-5 py-3 pr-12 rounded-[10px] bg-[#525c9c] text-white placeholder-white outline-none"
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          <button className="bg-white text-[#192166] py-2 rounded-[10px] font-semibold hover:bg-gray-200">
            Signup
          </button>

          <p className="text-center text-sm text-gray-300">
            Already have an account? {" "}
            <Link to="/login" className="text-white underline">
              Login
            </Link>
          </p>

          <div className="flex items-center gap-2 text-gray-300 my-2">
            <hr className="flex-1 border-gray-500" />
            <span>Or</span>
            <hr className="flex-1 border-gray-500" />
          </div>

          <button
            type="button"
            className="flex items-center justify-center gap-3 bg-[#525c9c] py-2 rounded-[10px] text-white hover:bg-[#6974b6]"
          >
            <FcGoogle size={22} />
            Sign up with Google
          </button>
        </form>
      </div>
    </div>
  );
}
