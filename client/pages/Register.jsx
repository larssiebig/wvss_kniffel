import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";

export default function Register({ user, setUser }) {
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
      const res = await axios.post(
        "http://localhost:3001/api/register",
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
        alert("Registration failed. Please try again.");
      }
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
