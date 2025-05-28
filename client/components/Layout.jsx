import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Layout({ user }) {
  return (
    <div className="w-screen min-h-screen bg-gray-100 text-black">
      <Navbar user={user} />
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
}
