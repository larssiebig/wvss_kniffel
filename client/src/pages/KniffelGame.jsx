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
  const [dice, setDice] = useState(Array(5).fill(null)); // Current dice values
  const [kept, setKept] = useState(Array(5).fill(false)); // Which dice are being kept
  const [rollsLeft, setRollsLeft] = useState(3); // Rolls left for the current turn
  const [scores, setScores] = useState(
    // Score for each category
    Object.fromEntries(categories.map((c) => [c, null]))
  );

  const [successMessage, setSuccessMessage] = useState(null); // Message after saving score
  const [errorMessage, setErrorMessage] = useState(null); // Message on error

  const isGameComplete = Object.values(scores).every((val) => val !== null);

  // Resets the game state
  const resetGame = () => {
    setDice(Array(5).fill(null));
    setKept(Array(5).fill(false));
    setRollsLeft(3);
    setScores(Object.fromEntries(categories.map((c) => [c, null])));
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  // Save score when game is complete
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

  // Toggles whether a die is kept or not
  const toggleKeep = (index) => {
    const newKept = [...kept];
    newKept[index] = !newKept[index];
    setKept(newKept);
  };

  // Rolls all non-kept dice
  const rollDice = () => {
    if (rollsLeft === 0) return;
    const newDice = dice.map((d, i) => (kept[i] && d !== null ? d : rollDie()));
    setDice(newDice);
    setRollsLeft(rollsLeft - 1);
  };

  // Applies score to a selected category and resets turn
  const scoreCategory = (category) => {
    if (scores[category] !== null) return;

    const newScores = { ...scores };
    newScores[category] = calculateScore(category, dice);
    // Reset turn
    setScores(newScores);
    setDice(Array(5).fill(null));
    setKept(Array(5).fill(false));
    setRollsLeft(3);
  };

  return (
    <div className="max-w-3xl mx-auto min-h-screen bg-gray-100 dark:bg-gray-900 p-8 w-screen text-gray-900 dark:text-white">
      <div className="flex justify-center mb-4">
        {dice.map((d, i) => (
          <button
            key={i}
            onClick={() => toggleKeep(i)}
<<<<<<< HEAD
            style={
              kept[i]
                ? {
                    backgroundColor: "#bfdbfe",
                    color: "black",
                  }
                : {
                    backgroundColor: "#1a1a1a",
                    color: "white",
                  }
            }
            className="w-14 h-14 m-2 flex items-center justify-center rounded-lg text-xl font-bold transition-colors duration-150"
=======
            className={`w-14 h-14 m-2 flex items-center justify-center rounded-lg text-xl font-bold transition-colors duration-150 border
              ${kept[i]
                ? "bg-blue-200 text-black dark:bg-blue-400"
                : "bg-gray-800 text-white dark:bg-gray-700 dark:text-white"
              }`}
>>>>>>> 80b9a2b4619fba7ac0bedaef485c1f015205a57f
          >
            {d !== null ? (
              <img
                src={`/dice-${d}.png`}
                alt={`Dice ${d}`}
                className="w-10 h-10 object-cover"
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
<<<<<<< HEAD
            onClick={rollDice}
            disabled={rollsLeft === 0}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
=======
          onClick={rollDice}
          disabled={rollsLeft === 0}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
>>>>>>> 80b9a2b4619fba7ac0bedaef485c1f015205a57f
          >
            Roll Dice ({rollsLeft} left)
          </button>
        )}
        <button
          onClick={resetGame}
<<<<<<< HEAD
          style={
            isGameComplete
              ? {
                  backgroundColor: "#ef4444",
                  color: "white",
                }
              : {
                  backgroundColor: "#fdc9c9",
                  color: "#242424",
                }
          }
          className="px-4 py-2 rounded font-semibold transition-colors duration-200"
=======
          className={`px-4 py-2 rounded font-semibold transition-colors duration-200
            ${isGameComplete
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-red-100 text-gray-800 hover:bg-red-200 dark:bg-red-200 dark:text-black"
            }`}
>>>>>>> 80b9a2b4619fba7ac0bedaef485c1f015205a57f
        >
          New Game
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            disabled={scores[cat] !== null || dice.includes(null)}
            onClick={() => scoreCategory(cat)}
            className={`p-2 border rounded text-left transition-colors
              ${scores[cat] !== null
                ? "bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed"
                : "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
          >
            {cat}: {scores[cat] ?? "-"}
          </button>
        ))}
      </div>

      <div className="mt-6 text-lg text-center">
        <div>
          Upper section sum:{" "}
          <span className="font-bold">{upperSectionSum(scores)}</span>
        </div>
        <div>
<<<<<<< HEAD
          Bonus:{" "}
          {hasBonus(scores) ? (
            <span className="text-green-700 font-bold">+35</span>
=======
          Bonus: {hasBonus(scores) ? (
            <span className="text-green-600 dark:text-green-400 font-bold">+35</span>
>>>>>>> 80b9a2b4619fba7ac0bedaef485c1f015205a57f
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
        <div
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded shadow-lg font-semibold z-50"
          style={{ zIndex: 1000 }}
        >
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded shadow-lg font-semibold z-50"
          style={{ zIndex: 1000 }}
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
}
