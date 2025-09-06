import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";

const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (token && username) {
      setUser({ username });
    }

    setIsLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      setIsLoading(true);
      // Using AUTH_API.LOGIN - POST /auth/login for user authentication
      const response = await authAPI.login(username, password);

      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("username", username);
        setUser({ username });
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username, email, password, name) => {
    try {
      setIsLoading(true);
      // Using AUTH_API.SIGNUP - POST /auth/signup for user registration
      await authAPI.signup(username, email, password, name);

      // After successful signup, automatically log in
      await login(username, password);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser(null);
    navigate("/login");
  };

  const contextValue = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
