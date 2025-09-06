import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);

    try {
      await register(
        formData.username,
        formData.email,
        formData.password,
        formData.username, // Use username as name fallback
      );
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#192166] to-[#2D1B69] flex">
      {/* Left Side - Welcome Section */}
      <div
        className="w-1/2 flex flex-col justify-center items-center p-12 text-white"
        style={{ backgroundColor: "rgba(53, 57, 141, 1)" }}
      >
        <div className="text-left flex flex-col mx-auto">
          <div className="flex items-center gap-2.5 text-left mb-8 mr-0">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <span className="text-2xl font-bold text-white">T</span>
            </div>
            <h1 className="text-4xl font-bold mr-auto">TravelUs</h1>
          </div>

          <h2 className="text-5xl font-bold mb-4">
            Welcome
            <br />
            to TravelUs!
          </h2>

          <p className="text-xl text-white/80 leading-relaxed max-w-md">
            Your All-in-One Group Travel Planner.
            <br />
            From Itineraries to Expenses — We've
            <br />
            Got Your Trip Covered.
          </p>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-1/2 flex flex-col justify-center items-center p-8 text-white">
        <div className="w-full max-w-md">
          <h3 className="text-3xl font-bold text-white text-center mb-8">
            Signup
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-500/20 border border-red-500/30 text-red-100 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Username Field */}
            <div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full px-4 py-4 bg-white/20 border-none rounded-lg text-white placeholder-white/70 focus:outline-none focus:bg-white/30 transition-all"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-4 py-4 bg-white/20 border-none rounded-lg text-white placeholder-white/70 focus:outline-none focus:bg-white/30 transition-all"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create Password"
                className="w-full px-4 py-4 bg-white/20 border-none rounded-lg text-white placeholder-white/70 focus:outline-none focus:bg-white/30 transition-all pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full px-4 py-4 bg-white/20 border-none rounded-lg text-white placeholder-white/70 focus:outline-none focus:bg-white/30 transition-all pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-gray-900 px-6 py-4 rounded-lg font-semibold hover:bg-gray-100 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-gray-900/30 border-t-gray-900 rounded-full animate-spin mx-auto"></div>
              ) : (
                "Signup"
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-white/30"></div>
              <span className="text-white/70 text-sm">Or</span>
              <div className="flex-1 h-px bg-white/30"></div>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-white/70">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-white font-semibold hover:text-white/80 transition-colors"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
