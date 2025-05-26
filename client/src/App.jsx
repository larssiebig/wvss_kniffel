import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Navbar from "../components/Navbar"; // <-- adjust path if needed
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="w-screen min-h-screen bg-gray-100 text-black">
      <Navbar />
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/user", { withCredentials: true })
      .then((res) => setUser(res.data));
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public routes without Navbar */}
        <Route path="/login" element={<Login user={user} />} />
        <Route path="/register" element={<Register user={user} />} />

        {/* Routes with persistent Navbar */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
        </Route>
      </Routes>
    </Router>
  );
}
