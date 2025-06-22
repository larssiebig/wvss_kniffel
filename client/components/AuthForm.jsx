import React from "react";

export default function AuthForm({
  title,
  username,
  password,
  setUsername,
  setPassword,
  onSubmit,
  buttonText,
}) {
  return (
    <div className="flex justify-center items-center min-h-screen w-screen bg-gray-100 text-black">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">{title}</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-2 border rounded"
        />
        <button
          onClick={onSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
