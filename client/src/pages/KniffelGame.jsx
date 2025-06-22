// client/src/pages/KniffelGame.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { categories, calculateScore } from "../utils/score";

// Utility to roll a single die (1–6)
function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}

export default function KniffelGame({ user }) {
  const [dice, setDice] = useState(Array(5).fill(null));    // Current dice values
  const [kept, setKept] = useState(Array(5).fill(false));   // Which dice are being kept
  const [rollsLeft, setRollsLeft] = useState(3);            // Rolls left for the current turn
  const [scores, setScores] = useState(                     // Score for each category
    Object.fromEntries(categories.map((c) => [c, null]))
  );

  const [successMessage, setSuccessMessage] = useState(null);   // Message after saving score
  const [errorMessage, setErrorMessage] = useState(null);       // Message on error

  const isGameComplete = Object.values(scores).every((val) => val !== null);

  // Resets the game state
  const resetGame = () => {
    setDice(Array(5).fill(null));
    setKept(Array(5).fill(false));
    setRollsLeft(3);
    setScores(Object.fromEntries(categories.map((c) => [c, null])));
    setSuccessMessage(null);
    setErrorMessage(null);
  }

  // Save score when game is complete
  useEffect(() => {
    if(!isGameComplete) return;

    const totalScore = Object.values(scores).reduce(
      (sum, val) => sum + (val ?? 0),
      0,
    );

    if(user) {
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
          console.error("Score saving failed:", error);
          setErrorMessage("Error saving your score");
          setTimeout(() => setErrorMessage(null), 3000);
        });
    }
  }, [isGameComplete]);

  // Toggles whether a die is kept or not
  const toggleKeep = (index) => {
    const newKept = [...kept];
    newKept[index] = !newKept[index];
    setKept(newKept);
  }

  // Rolls all non-kept dice
  const rollDice = () => {
    if (rollsLeft === 0) return;
    const newDice = dice.map((d, i) => (kept[i] && d !== null ? d : rollDie()));
    setDice(newDice);
    setRollsLeft(rollsLeft - 1);
  }

  // Applies score to a selected category and resets turn
  const scoreCategory = (category) => {
    if (scores[category] !== null) return;

    const newScores = { ...scores };
    newScores[category] = calculateScore(category, dice);
<<<<<<< HEAD
=======
    // Reset turn
>>>>>>> 883c5da4a5ac47010dee3518a9bfe405146adfcc
    setScores(newScores);
    setDice(Array(5).fill(null));
    setKept(Array(5).fill(false));
    setRollsLeft(3);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 w-screen text-white">
      <div className="flex justify-center mb-4">
        {dice.map((d, i) => (
          <button
            key={i}
            onClick={() => toggleKeep(i)}
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
          onClick={rollDice}
          disabled={rollsLeft === 0}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Roll Dice ({rollsLeft} left)
          </button>
        )}
        <button
          onClick={resetGame}
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
        >
          New Game
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
<<<<<<< HEAD
        {categories.map((cat) => {
          const isChosen = scores[cat] !== null;
          const isPreview = !isChosen && dice.every((d) => d !== null);
          const previewScore = isPreview ? calculateScore(cat, dice) : "-";

          return (
            <button
              key={cat}
              disabled={isChosen}
              onClick={() => scoreCategory(cat)}
              className={`p-2 border rounded text-left transition-colors duration-200 ${
                isChosen
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {cat}:{" "}
              <span className={isPreview ? "text-gray-400" : ""}>
                {isChosen ? scores[cat] : previewScore}
              </span>
            </button>
          );
        })}
=======
        {categories.map((cat) => (
          <button
            key={cat}
            disabled={scores[cat] !== null || dice.includes(null)}
            onClick={() => scoreCategory(cat)}
            className={`p-2 border rounded text-left ${
              scores[cat] !== null
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-white"
            }`}
          >
            {cat}: {scores[cat] ?? "-"}
          </button>
        ))}
>>>>>>> 9c6f2dadc7c253023d2fae972b149a2859073635
      </div>

      {isGameComplete && (
        <div className="mt-6 text-xl font-bold text-green-700 text-center">
          Final score: {Object.values(scores).reduce((a, b) => a + (b ?? 0), 0)}
        </div>
      )}

      {successMessage && (
        <div
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded shadow-lg font-semibold"
          style={{ zIndex: 1000 }}
        >
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded shadow-lg font-semibold"
          style={{ zIndex: 1000 }}
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
}