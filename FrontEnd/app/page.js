"use client";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Adduser from "./components/Adduser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for styling

export default function Home() {
  return (
    <div className="w-[100vw] h-[100vh] bg-[#131314] relative">
      <ToastContainer />
      <Navbar />
      <Adduser />
    </div>
  );
}
