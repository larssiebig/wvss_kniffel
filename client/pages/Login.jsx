import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";

export default function Login({ user }) {
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
      .then(() => navigate("/dashboard"));
  };

  if (user) {
    return (
      <div>
        <p>You are logged in.</p>
        <button onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
      </div>
    );
  }
  console.log({ username, password });

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
