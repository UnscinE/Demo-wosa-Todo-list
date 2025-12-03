"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const correctEmail = "test_todo@test.com";
    const correctPassword = "123456789";

    if (email === correctEmail && password === correctPassword) {
      console.log("Login success");
      router.push("/todos");
    } else {
      setError("Username หรือ Password ไม่ถูกต้อง");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">

        <h1 className="text-3xl font-bold mb-2 text-center">Todo List</h1>

        <h2 className="text-xl text-gray-600 mb-6 text-center">
          Sign in to your account
        </h2>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>

          {/* Forgot Password */}
          <button
            type="button"
            className="text-sm text-blue-600 hover:underline mt-2"
            onClick={() => console.log("Forgot password clicked")}
          >
            Forgot your password?
          </button>

        </form>

        <div className="text-center mt-4">
          <Link href="/" className="text-gray-600 hover:underline text-sm">
            Home Page
          </Link>
        </div>

      </div>
    </div>
  );
}
