import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="w-screen min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
