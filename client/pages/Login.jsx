import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";

export default function Login({ user, setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = () => {
    axios
      .post(
        "http://localhost:3001/api/login",
        { username, password },
        { withCredentials: true }
      )
      .then((res) => {
        if(res.data.success) {
          setUser(res.data.user);
          navigate("/dashboard");
        } else {
          alert("Login failed. Please check your credentials.");
        }
      })
      .catch((error) => {
        if(error.response?.status === 401) {
          alert("Invalid username or password.");
        } else {
          alert("An error occurred while logging in. Please try again.");
        }
      })
  };

  if (user) {
    return (
      <div>
        <p>You are logged in.</p>
        <button onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
      </div>
    );
  }

  return (
    <AuthForm
      title="Login"
      username={username}
      password={password}
      setUsername={setUsername}
      setPassword={setPassword}
      onSubmit={login}
      buttonText="Login"
    />
  );
}
