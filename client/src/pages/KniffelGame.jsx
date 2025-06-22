// client/src/pages/KniffelGame.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  categories,
  calculateScore,
  upperSectionSum,
  hasBonus,
} from "../utils/score";

// Utility to roll a single die (1–6)
function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}

export default function KniffelGame({ user }) {
  const [dice, setDice] = useState(Array(5).fill(null));
  const [kept, setKept] = useState(Array(5).fill(false));
  const [rollsLeft, setRollsLeft] = useState(3);
  const [scores, setScores] = useState(
    Object.fromEntries(categories.map((c) => [c, null]))
  );

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const isGameComplete = Object.values(scores).every((val) => val !== null);

  const resetGame = () => {
    setDice(Array(5).fill(null));
    setKept(Array(5).fill(false));
    setRollsLeft(3);
    setScores(Object.fromEntries(categories.map((c) => [c, null])));
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  useEffect(() => {
    if (!isGameComplete) return;

    const upperSum = upperSectionSum(scores);
    const bonus = hasBonus(scores) ? 35 : 0;
    const totalScore =
      Object.values(scores).reduce((sum, val) => sum + (val ?? 0), 0) + bonus;

    if (user) {
      axios
        .post(
          "http://localhost:3001/api/score",
          { value: totalScore },
          { withCredentials: true }
        )
        .then(() => {
          setSuccessMessage(
            `Game is complete! Your score of ${totalScore} has been saved.`
          );
        })
        .catch((error) => {
          const message =
            error.response?.data?.error || "Error saving your score";
          setErrorMessage(message);
          setTimeout(() => setErrorMessage(null), 3000);
        });
    }
  }, [isGameComplete, scores, user]);

  const toggleKeep = (index) => {
    const newKept = [...kept];
    newKept[index] = !newKept[index];
    setKept(newKept);
  };

  const rollDice = () => {
    if (rollsLeft === 0) return;
    const newDice = dice.map((d, i) => (kept[i] && d !== null ? d : rollDie()));
    setDice(newDice);
    setRollsLeft(rollsLeft - 1);
  };

  const scoreCategory = (category) => {
    if (scores[category] !== null) return;
    const newScores = { ...scores };
    newScores[category] = calculateScore(category, dice);
    setScores(newScores);
    setDice(Array(5).fill(null));
    setKept(Array(5).fill(false));
    setRollsLeft(3);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="w-full max-w-4xl p-8">
        <div className="flex justify-center mb-4">
          {dice.map((d, i) => (
            <button
              key={i}
              onClick={() => toggleKeep(i)}
              className={`w-24 h-24 m-2 flex items-center justify-center rounded-xl border-2 transition-colors duration-150
                ${
                  kept[i]
                    ? "bg-blue-200 text-black dark:bg-blue-400"
                    : "bg-gray-800 text-white dark:bg-gray-700"
                }`}
            >
              {d !== null ? (
                <img
                  src={`/dice-${d}.png`}
                  alt={`Dice ${d}`}
                  className="w-20 h-20 object-contain"
                />
              ) : (
                "-"
              )}
            </button>
          ))}
        </div>

        <div className="flex justify-center gap-4 mb-6">
          {!isGameComplete && (
            <button
              onClick={rollDice}
              disabled={rollsLeft === 0}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Roll Dice ({rollsLeft} left)
            </button>
          )}
          <button
            onClick={resetGame}
            className={`px-4 py-2 rounded font-semibold transition-colors duration-200
              ${
                isGameComplete
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-red-100 text-gray-800 hover:bg-red-200 dark:bg-red-200 dark:text-black"
              }`}
          >
            New Game
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
          {categories.map((cat) => {
            const isChosen = scores[cat] !== null;
            const allRolled = dice.every((d) => d !== null);
            const previewScore =
              !isChosen && allRolled ? calculateScore(cat, dice) : null;

            return (
              <button
                key={cat}
                disabled={isChosen || !allRolled}
                onClick={() => scoreCategory(cat)}
                className={`p-2 border rounded text-left transition-colors
                  ${
                    isChosen
                      ? "bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed"
                      : "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
              >
                {cat}:{" "}
                <span className={previewScore !== null ? "text-gray-400" : ""}>
                  {isChosen ? scores[cat] : previewScore ?? "-"}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 text-lg text-center">
          <div>
            Upper section sum:{" "}
            <span className="font-bold">{upperSectionSum(scores)}</span>
          </div>
          <div>
            Bonus:{" "}
            {hasBonus(scores) ? (
              <span className="text-green-600 dark:text-green-400 font-bold">
                +35
              </span>
            ) : (
              <span className="text-red-600 dark:text-red-400 font-bold">
                {upperSectionSum(scores)} / 63
              </span>
            )}
          </div>
        </div>

        {isGameComplete && (
          <div className="mt-6 text-xl font-bold text-center text-green-700 dark:text-green-400">
            <div>Upper section sum: {upperSectionSum(scores)}</div>
            <div>
              Bonus:{" "}
              {hasBonus(scores) ? (
                <span className="text-green-700 font-bold">+35</span>
              ) : (
                <span className="text-red-600 font-bold">0</span>
              )}
            </div>
            <div>
              Final score:{" "}
              {Object.values(scores).reduce((a, b) => a + (b ?? 0), 0) +
                (hasBonus(scores) ? 35 : 0)}
            </div>
          </div>
        )}

        {successMessage && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded shadow-lg font-semibold z-50">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded shadow-lg font-semibold z-50">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
}
