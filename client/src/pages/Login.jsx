// client/src/pages/Login.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import Modal from "../components/Modal";

export default function Login({ user, setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modalMessage, setModalMessage] = useState(null);
  const navigate = useNavigate();

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if(user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const closeModal = () => setModalMessage(null);

  // Handles login form submission
  const handleLogin = async () => {
    // Basic form validation
    if(!username || !password) {
      setModalMessage("Please enter username and password.");
      return;
    }

    try {
      // Send login request to backend
      const res = await axios.post(
        "http://localhost:3001/api/login",
        { username, password },
        { withCredentials: true }
      );

      if(res.data.success) {
        const userRes = await axios.get("http://localhost:3001/api/user", {
          withCredentials: true,
        });
        setUser(userRes.data);
        navigate("/dashboard");
      } else {
        setModalMessage("Login failed. Please try again.");
      }
    } catch (error) {
      if(error.response?.data?.message) {
        setModalMessage(`Error: ${error.response.data.message}`);
      } else {
        setModalMessage("Login failed. Please try again.");
      }
    }
  }

  return (
    <>
      <AuthForm
        title="Login"
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        onSubmit={handleLogin}
        buttonText="Login"
      />

      <Modal message={modalMessage} onClose={closeModal} />
     </>
  );
}