// client/src/utils/score.js

// List of all scoring categories used in the game
export const categories = [
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


// Calculates the score for a given category based on the current dice values.
export function calculateScore(category, dice) {
  const counts = [0, 0, 0, 0, 0, 0];        // Tracks how many times each die face appears
  dice.forEach((d) => counts[d - 1]++);     // Fill the counts array based on dice values

  switch (category) {
    // Categories 1–6: Score sum of dice that match the number
    case "Ones":
    case "Twos":
    case "Threes":
    case "Fours":
    case "Fives":
    case "Sixes": {
      const num = categories.indexOf(category) + 1;
      return dice.filter((d) => d === num).reduce((a, b) => a + b, 0);
    }
    case "Three of a Kind":
      return counts.some((c) => c >= 3) ? sum(dice) : 0;          // Requires at least 3 dice with the same value
    case "Four of a Kind":
      return counts.some((c) => c >= 4) ? sum(dice) : 0;          // Requires at least 4 dice with the same value
    case "Full House":
      return counts.includes(3) && counts.includes(2) ? 25 : 0;   // Full House: One pair and one triple
    case "Small Straight":
      return hasStraight(counts, 4) ? 30 : 0;                     // Small Straight: Sequence of 4 consecutive numbers
    case "Large Straight":
      return hasStraight(counts, 5) ? 40 : 0;                     // Large Straight: Sequence of 5 consecutive numbers
    case "Kniffel":
      return counts.includes(5) ? 50 : 0;                         // Kniffel (Yahtzee): All 5 dice are the same
    case "Chance":
      return sum(dice);                                           // Chance: Sum of all dice regardless of values
    default:
      return 0;
  }
}

// Utility function to sum up all values in an array.
function sum(arr) {
  return arr.reduce((a, b) => a + b, 0);
}

// Checks if the dice contain a straight (sequence of given length).
// Converts the counts array to a binary string and checks for known patterns.
export function hasStraight(counts, length) {
  const binary = counts.map((c) => (c > 0 ? 1 : 0)).join("");
  const patterns = {
    4: ["1111", "01111", "11110"],    // Possible positions for small straight
    5: ["11111"],                     // Only one position for large straight
  }
  return patterns[length].some((p) => binary.includes(p));
}