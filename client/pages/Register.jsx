import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";

export default function Register({ user }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleRegister = async () => {
    try {
      await axios.post(
        "http://localhost:3001/api/register",
        { username, password },
        { withCredentials: true }
      );
      navigate("/dashboard");
    } catch {
      alert("Registration failed.");
    }
  };

  return (
    <AuthForm
      title="Register"
      username={username}
      password={password}
      setUsername={setUsername}
      setPassword={setPassword}
      onSubmit={handleRegister}
      buttonText="Register"
    />
  );
}
