import React, { useState } from "react";
import axios from "axios";

export default function Dashboard({ user }) {
  const [highscores, setHighscores] = useState([]);

  const loadHighscores = () => {
    axios
      .get("http://localhost:3001/api/highscores")
      .then((res) => setHighscores(res.data));
  };

  if (!user) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-700">Please log in...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen bg-gray-100 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Hello, {user.username}
        </h1>

        <div className="flex gap-4 mb-8">
          <button
            onClick={loadHighscores}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            Load highscores
          </button>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Highscores
          </h2>
          {highscores.length > 0 ? (
            <ul className="space-y-2">
              {highscores.map((entry, i) => (
                <li
                  key={i}
                  className="bg-gray-50 border rounded-md p-3 shadow-sm text-gray-800"
                >
                  {entry.user.username}: {entry.value}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No highscores loaded.</p>
          )}
        </div>
      </div>
    </div>
  );
}
