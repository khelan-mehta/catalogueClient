"use client"; // This ensures it's a client-side component

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, RefreshCcw, X } from "lucide-react";

import InputWithIcon from "@/components/InputWithIcon";
import { TransitionLink } from "@/components/TransitionLink";
import axios from "axios";

import CryptoJS from "crypto-js";
import { MessageBox } from "@/components/MessageBox";
import { setSession } from "../lib/session";

import { useNavigate } from "react-router-dom";
import { BASE_URL, CryptoSecret } from "../env";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [university, setUniversity] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState<string | null>(null); // State to store image URL
  const [avatarBox, setAvatarBox] = useState(false); // Toggle avatar picker
  const [avatar, setAvatar] = useState<string | null>(
    "https://api.multiavatar.com/default.svg"
  ); // Selected avatar
  const [defaultAvatars, setDefaultAvatars] = useState<string[]>([]); // Default avatar URLs

  // Function to get a random word
  const [generated, setGenerated] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  // Load default avatars on initial render

  // Handle image file input
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const [messageBox, setMessageBox] = useState({
    type: "",
    message: "",
    isVisible: false,
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    const token = localStorage.getItem("access_token");
    if (token) {
      // Store the token received from Google login response

      window.history.replaceState({}, document.title, window.location.pathname);
      navigate("/dashboard");
    }
    const emails = searchParams.get("email"); // Access the message query parameter
    console.log(searchParams);
    
    setEmail(emails);
  }, []);

  // Assuming sessionStorage functions are in this file

  const handleRegister = async () => {
    if (!validateEmail(email)) {
      setMessageBox({
        type: "error",
        message: "Invalid email format!",
        isVisible: true,
      });
      return;
    }

    if (!validatePassword(password)) {
      setMessageBox({
        type: "error",
        message:
          "Password must be at least 8 characters long, contain at least one uppercase letter and one number.",
        isVisible: true,
      });
      return;
    }

    try {
      const encryptedPassword = CryptoJS.AES.encrypt(
        password,
        CryptoSecret
      ).toString();

      const response = await axios.post(`${BASE_URL}/api/auth/register`, {
        email,
        password: encryptedPassword,
        username,
      });

      const message = response.data.message;
      if (message.includes("Email is already in use")) {
        setMessageBox({
          type: "error",
          message: "Email is already in use. Please use a different email.",
          isVisible: true,
        });
      } else if (message.includes("Username is already in use")) {
        setMessageBox({
          type: "error",
          message:
            "Username is already in use. Please choose a different username.",
          isVisible: true,
        });
      } else {
        // Assuming response contains accessToken and userId
        const { accessToken, userId } = response.data;

        // Store accessToken and userId in session storage
        setSession("access_token", accessToken);
        setSession("userId", userId);

        setMessageBox({
          type: "success",
          message: response.data.message,
          isVisible: true,
        });
        navigate("/dashboard");
      }
    } catch (error) {
      setMessageBox({
        type: "error",
        message: "Registration failed. Please try again.",
        isVisible: true,
      });
    }
  };

  // Shuffle avatars by regenerating them

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-indigo-200 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6">
        {/* Header */}
        <div className="space-y-1 mb-6">
          <h1 className="text-3xl font-bold text-center text-indigo-900">
            Register
          </h1>
          <p className="text-center text-gray-600">Create your account</p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Username */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example12@gmail.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password */}
          <div className="space-y-2 relative">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-sm text-indigo-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Register Button */}
          <button
            onClick={handleRegister}
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Register
          </button>

          {/* Login Link */}
          <p className="text-center text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-indigo-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
