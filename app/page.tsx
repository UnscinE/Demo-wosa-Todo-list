"use client";
import React, { useState } from "react";
import Image from "next/image";
import Navbar from "./navbar/navbar";
import Link from "next/link";


const Home: React.FC = () => {
  //const [count, setCount] = useState(0);
  return (

    <div className="flex flex-col max-w-full items-center justify-center min-h-screen bg-white">
      
      {/* ใช้ Navbar component */}
      <Navbar />

      <main className="min-h-screen bg-gray-100 flex flex-col items-center px-6">

        {/* Header */}
        <header className="w-full max-w-5xl py-6 flex justify-center items-center">
          <h1 className="text-2xl font-bold">TodoList</h1>
          
          
        </header>


        {/* Hero Section */}
        <section className="mt-20 text-center max-w-3xl">
          <h2 className="text-5xl font-bold mb-4">Manage your tasks easily</h2>
          <p className="text-gray-600 mb-8 text-lg">
            A simple To-Do app to help you stay organized and productive every day.
          </p>

          <Link href="/todos"> {/* Replace with your actual todo page path */}
            <button className="px-7 py-3 bg-blue-600 text-white rounded-xl text-lg hover:bg-blue-700 transition">
              Start Now
            </button>
          </Link>
        </section>

        {/* Image Section */}
        <div className="mt-16">
          <Image
            src="/todo-illustration.png"
            alt="Todo Illustration"
            width={500}
            height={350}
            className="rounded-xl shadow-xl"
          />
        </div>

        {/* Features Section */}
        <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">

          <div className="p-6 bg-white rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-2">📌 Easy to Add Tasks</h3>
            <p className="text-gray-600">Add new tasks instantly with a clean UI.</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-2">⏳ Track Your Progress</h3>
            <p className="text-gray-600">Mark tasks done and boost productivity.</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-2">📱 Works on Any Device</h3>
            <p className="text-gray-600">Fully responsive design for all screens.</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 mb-10 text-gray-600">
          © 2025 TodoList — Built with Next.js + TypeScript
        </footer>

      </main>


    </div>
  );
};

export default Home;
