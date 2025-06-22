import React, { useState } from "react";

const categories = [
  "Ones",
  "Twos",
  "Threes",
  "Fours",
  "Fives",
  "Sixes",
  "Three of a Kind",
  "Four of a Kind",
  "Full House",
  "Small Straight",
  "Large Straight",
  "Kniffel",
  "Chance",
];

function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}

function rollAllDice(kept) {
  return Array(5)
    .fill(0)
    .map((_, i) => (kept[i] ? null : rollDie()));
}

export default function KniffelGame({ user }) {
  const [dice, setDice] = useState(Array(5).fill(null));
  const [kept, setKept] = useState(Array(5).fill(false));
  const [rollsLeft, setRollsLeft] = useState(3);
  const [scores, setScores] = useState(
    Object.fromEntries(categories.map((c) => [c, null]))
  );

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

  const calculateScore = (category, dice) => {
    const counts = [0, 0, 0, 0, 0, 0];
    dice.forEach((d) => counts[d - 1]++);

    switch (category) {
      case "Ones":
      case "Twos":
      case "Threes":
      case "Fours":
      case "Fives":
      case "Sixes":
        const num = categories.indexOf(category) + 1;
        return dice.filter((d) => d === num).reduce((a, b) => a + b, 0);
      case "Three of a Kind":
        return counts.some((c) => c >= 3) ? dice.reduce((a, b) => a + b, 0) : 0;
      case "Four of a Kind":
        return counts.some((c) => c >= 4) ? dice.reduce((a, b) => a + b, 0) : 0;
      case "Full House":
        return counts.includes(3) && counts.includes(2) ? 25 : 0;
      case "Small Straight":
        return hasStraight(counts, 4) ? 30 : 0;
      case "Large Straight":
        return hasStraight(counts, 5) ? 40 : 0;
      case "Kniffel":
        return counts.includes(5) ? 50 : 0;
      case "Chance":
        return dice.reduce((a, b) => a + b, 0);
      default:
        return 0;
    }
  };

  const hasStraight = (counts, length) => {
    const binary = counts.map((c) => (c > 0 ? 1 : 0)).join("");
    const patterns = {
      4: ["1111", "01111", "11110"],
      5: ["11111"],
    };
    return patterns[length].some((p) => binary.includes(p));
  };

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

      <div className="flex justify-center mb-6">
        <button
          onClick={rollDice}
          disabled={rollsLeft === 0}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Roll Dice ({rollsLeft} left)
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
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
      </div>
    </div>
  );
}
