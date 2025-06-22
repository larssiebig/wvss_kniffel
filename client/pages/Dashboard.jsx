import React, { useState } from "react";
import axios from "axios";

export default function Dashboard({ user }) {
  const [score, setScore] = useState(0);
  const [highscores, setHighscores] = useState([]);

  const saveScore = () => {
    axios
      .post(
        "http://localhost:3001/api/score",
        { value: score },
        { withCredentials: true }
      )
      .then(() => alert("Score saved."));
  };

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

        <div className="mb-6 text-black">
          <label className="block text-gray-600 font-medium mb-2">Score:</label>
          <input
            type="number"
            value={score}
            onChange={(e) =>
              setScore(e.target.value ? Number(e.target.value) : 0)
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={saveScore}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            Save score
          </button>
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
