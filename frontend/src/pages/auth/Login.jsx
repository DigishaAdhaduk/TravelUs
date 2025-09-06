import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
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
    setIsLoading(true);
    setError("");

    try {
      await login(formData.username, formData.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#192166] to-[#2D1B69] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm mx-auto mb-4">
            <span className="text-3xl font-bold text-white">T</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">TravelUs</h1>
        </div>

        {/* Login Form Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
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

            {/* Password Field */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
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

            {/* Forgot Password */}
            <div className="text-center">
              <button
                type="button"
                className="text-white/70 hover:text-white text-sm transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-gray-900 px-6 py-4 rounded-lg font-semibold hover:bg-gray-100 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-gray-900/30 border-t-gray-900 rounded-full animate-spin mx-auto"></div>
              ) : (
                "Login"
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-white/30"></div>
              <span className="text-white/70 text-sm">Or</span>
              <div className="flex-1 h-px bg-white/30"></div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-white/70">
                Already have an account?{" "}
                <Link
                  to="/signup"
                  className="text-white font-semibold hover:text-white/80 transition-colors"
                >
                  Signup
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
