// client/src/App.jsx

import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import KniffelGame from "./pages/KniffelGame";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

// Layout component wraps each page with shared UI components like Navbar.
// Outlet is where the nested route components will be rendered.
function Layout({ user, setUser }) {
  return (
    <div className="w-screen min-h-screen bg-gray-100 text-black">
      <Navbar user={user} setUser={setUser} />
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
}

// Main App component sets up routing and manages global user state.
export default function App() {
  const [user, setUser] = useState(null);         // Holds authenticated user data
  const [loading, setLoading] = useState(true);   // True until user fetch completes

  // On mount: fetch user data from backend to check if logged in
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/user", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null; // or a spinner

  return (
    <Router>
      <Routes>
        {/* Public routes: only if not logged in */}
        {!user && <Route path="/login" element={<Login user={user} setUser={setUser} />} />}
        {!user && <Route path="/register" element={<Register user={user} setUser={setUser} />} />}

        {/* Redirect if trying to access /login or /register when already logged in */}
        {user && <Route path="/login" element={<Navigate to="/dashboard" />} />}
        {user && (
          <Route path="/register" element={<Navigate to="/dashboard" />} />
        )}

        <Route element={<Layout user={user} setUser={setUser} />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/kniffel" element={<KniffelGame user={user} />} />
        </Route>
      </Routes>
    </Router>
  );
}