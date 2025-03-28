"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

import CryptoJS from "crypto-js";
import { BASE_URL, CryptoSecret } from "@/env";
import { setSession } from "@/lib/session";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const encryptedPassword = CryptoJS.AES.encrypt(
        password,
        CryptoSecret
      ).toString();
      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
        email,
        password: encryptedPassword,
      });
      setSession("access_token", response.data.access_token);
      setSession("userId", response.data.userId);
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Google login callback
  const handleGoogleLogin = async () => {
    // Redirecting to your backend for Google login
    window.location.href = `${BASE_URL}/api/auth/google/login`;
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token =
      queryParams.get("access_token") || localStorage.getItem("access_token");
    const userId = queryParams.get("userId") || "";
    if (token) {
      console.log(token);
      console.log(userId);
      
      setSession("access_token", token);
      setSession("userId", userId);
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-100 to-purple-100 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center text-indigo-900">
            Sign In
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            {errorMessage && (
              <p className="text-red-500 text-sm text-center">{errorMessage}</p>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2 relative">
              <div className="flex justify-between w-full">
                <Label htmlFor="password">Password</Label>
                <p className="text-center  text-sm">
                  Forgot Password?{" "}
                  <a href="/forgot" className="text-indigo-600">
                    Reset
                  </a>
                </p>
              </div>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                className="absolute right-3 top-10 text-sm text-indigo-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col  gap-4">
            <div className="flex w-full gap-4">
              <div className=" flex justify-between">
                <button
                  onClick={handleGoogleLogin}
                  className=" bg-[#181818] items-center justify-center flex border border-white  text-white rounded-[8px]  "
                >
                  <img
                    src="google.png"
                    alt="google image"
                    className="h-9 w-9 "
                  />
                </button>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </div>
            <p className="text-center text-sm">
              Don’t have an account?{" "}
              <a href="/register" className="text-indigo-600">
                Register
              </a>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
