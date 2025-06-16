// client/src/pages/Rules.jsx

import React from "react";

export default function Rules() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        🎲 Kniffel Game Rules
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">🎯 Objective</h2>
        <p>
          The goal of Kniffel is to maximize your score over 13 turns by rolling five dice and choosing the best scoring category each round.
          Each category can only be used once.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">🔁 Game Flow</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>You have up to <span className="font-medium">three rolls</span> per turn.</li>
          <li>After each roll, you can keep any dice and re-roll the others.</li>
          <li>After the third roll (or earlier), you must choose a <span className="font-medium">scoring category</span>.</li>
          <li>Each category may only be selected once per game.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">🧮 Scoring Categories</h2>
        <p className="mb-4">
          There are 13 categories divided into two sections: the <span className="font-medium">Upper Section</span> and the <span className="font-medium">Lower Section</span>.
        </p>

        <ul className="list-disc list-inside space-y-1 mb-6">
          <li><span className="font-medium">Upper Section:</span> Score the total of ones through sixes. A total of 63 or more earns a 35-point bonus.</li>
          <li><span className="font-medium">Lower Section:</span> Includes combinations like Full House, Straights, and Kniffel.</li>
        </ul>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left border border-gray-200 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 font-semibold text-gray-700">Category</th>
                <th className="px-4 py-2 font-semibold text-gray-700">Description / Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-2">Ones – Sixes</td>
                <td className="px-4 py-2">Sum of dice showing that number</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Three of a Kind</td>
                <td className="px-4 py-2">At least 3 of the same – sum of all dice</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Four of a Kind</td>
                <td className="px-4 py-2">At least 4 of the same – sum of all dice</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Full House</td>
                <td className="px-4 py-2">Three of a kind + a pair – 25 points</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Small Straight</td>
                <td className="px-4 py-2">Sequence of 4 (e.g. 1-2-3-4) – 30 points</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Large Straight</td>
                <td className="px-4 py-2">Sequence of 5 (e.g. 2-3-4-5-6) – 40 points</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Kniffel</td>
                <td className="px-4 py-2">All 5 dice the same – 50 points</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Chance</td>
                <td className="px-4 py-2">Sum of all dice – no restrictions</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">🎁 Bonus</h2>
        <p>
          If the upper section total (Ones–Sixes) is 63 or higher, you receive a <span className="font-medium">35-point bonus</span>.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🏁 End of Game</h2>
        <p>
          After all 13 categories have been filled, the game ends.
          The winner is the player with the highest combined total.
        </p>
      </section>
    </div>
  );
}