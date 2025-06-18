// client/src/components/Layout.jsx

// Layout component providing the overall page structure.
// Includes the Navbar and a container for nested routes rendered via React Router's <Outlet>.
// Receives the current user as a prop to pass down to Navbar.

import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Layout({ user }) {
  return (
    <div className="min-h-screen w-full bg-gray-100 text-black dark:bg-gray-900 dark:text-white flex flex-col">
      <Navbar user={user} />
      <div className="flex-grow p-6 max-w-7xl mx-auto w-full">
        <Outlet />
      </div>
    </div>
  );
}