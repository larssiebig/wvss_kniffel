// client/src/pages/Dashboard.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../components/Modal";

export default function Dashboard({ user }) {
  const [highscores, setHighscores] = useState([]);
  const [myScores, setMyScores] = useState([]);
  const [myHistory, setMyHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [myStats, setMyStats] = useState(null);
  const [globalStats, setGlobalStats] = useState(null);
  const [modalMessage, setModalMessage] = useState(null);

  // Load top global highscores from backend
  const loadHighscores = () => {
    axios
      .get(
        "http://localhost:3001/api/highscores",
        { withCredentials: true }
      )
      .then((res) => setHighscores(res.data))
      .catch((error) => {
        const message = error.response?.data?.error || "Failed to load highscores.";
        setModalMessage(message);
      });
  }

  // Load personal top scores for current user
  const loadMyScores = () => {
    axios
      .get(
        "http://localhost:3001/api/my-scores",
        { withCredentials: true }
      )
      .then((res) => setMyScores(res.data))
      .catch((error) => {
        const message = error.response?.data?.error || "Failed to load your scores.";
        setModalMessage(message);
      });
  }

  // Load detailed game history if not already loaded
  const loadMyHistory = async () => {
    if(myHistory.length === 0) {
      setLoadingHistory(true);

      try {
        const res = await axios.get("http://localhost:3001/api/my-history", {
          withCredentials: true,
        });
        setMyHistory(res.data);
      } catch (error) {
        const message = error.response?.data?.error || "Failed to load game history.";
        setModalMessage(message);
      } finally {
        setLoadingHistory(false);
      }
    }
  }

  // Load personal statistics for the user
  const loadMyStats = () => {
    axios
      .get(
        "http://localhost:3001/api/my-stats",
        { withCredentials: true }
      )
      .then((res) => setMyStats(res.data))
      .catch((error) => {
        const message = error.response?.data?.error || "Failed to load your statistics.";
        setModalMessage(message);
      });
  }

  const loadGlobalStats = () => {
    axios
      .get(
        "http://localhost:3001/api/global-stats",
        { withCredentials: true }
      )
      .then((res) => setGlobalStats(res.data))
      .catch((error) => {
        const message = error.response?.data?.error || "Failed to load global statistics.";
        setModalMessage(message);
      });
  }


  // Toggle showing the game history panel
  const toggleHistory = async () => {
    if(!showHistory) await loadMyHistory();
    setShowHistory((prev) => !prev);
  }

  // On mount or user change, load scores if logged in
  useEffect(() => {
    if (user) {
      loadHighscores();
      loadMyScores();
      loadMyStats();
      loadGlobalStats();
    }
  }, [user]);

  // Show prompt if not logged in
  if (!user) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-700">Please log in...</p>
      </div>
    );
  }

  // Render dashboard with highscores, personal scores, and optional history
  return (
    <><div className="max-w-3xl mx-auto min-h-screen w-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-xl dark:shadow-lg rounded-2xl p-8">

        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          Hello, {user.username}
        </h1>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => {
              loadHighscores();
              loadMyScores();
            } }
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            Refresh scores
          </button>

          <button
            onClick={toggleHistory}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            {showHistory ? "Hide Game History" : "Show Game History"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Your Statistics
            </h2>
            {myStats ? (
              <ul className="space-y-1 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-4 shadow text-gray-900 dark:text-gray-100">
                <li>Games played: <span className="font-bold">{myStats.gamesPlayed}</span></li>
                <li>Average score: <span className="font-bold">{myStats.avgScore}</span></li>
              </ul>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">Loading...</p>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Global Statistics
            </h2>
            {globalStats ? (
              <ul className="space-y-1 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-4 shadow text-gray-900 dark:text-gray-100">
                <li>Games played: <span className="font-bold">{globalStats.gamesPlayed}</span></li>
                <li>Average score: <span className="font-bold">{globalStats.avgScore}</span></li>
              </ul>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">Loading...</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
              Top 10 Highscores
            </h2>
            {highscores.length > 0 ? (
              <ul className="space-y-2">
                {highscores.map((entry, i) => (
                  <li
                    key={i}
                    className="bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 rounded-md p-3 shadow-sm text-gray-800 dark:text-white"
                  >
                    {entry.user.username}: {entry.value}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No highscores available.</p>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
              Your top scores
            </h2>
            {myScores.length > 0 ? (
              <ul className="space-y-2">
                {myScores.map((entry, i) => (
                  <li
                    key={i}
                    className="bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 rounded-md p-3 shadow-sm text-gray-800 dark:text-white"
                  >
                    {entry.value}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No personal scores yet.</p>
            )}
          </div>

          {showHistory && (
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
                Your Game History
              </h2>
              {loadingHistory ? (
                <p className="text-gray-500 dark:text-gray-400">Loading history...</p>
              ) : myHistory.length > 0 ? (
                <ul className="space-y-2 max-h-60 overflow-auto border rounded-md p-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white dark:border-gray-600">
                  {myHistory.map((entry, i) => (
                    <li key={i} className="border-b dark:border-gray-600 py-1 last:border-b-0">
                      <strong>Date:</strong>{" "}
                      {new Date(entry.date).toLocaleString()} -{" "}
                      <strong>Score:</strong> {entry.value}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No game history available.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
      <Modal message={modalMessage} onClose={() => setModalMessage(null)} />
    </>
  );
}