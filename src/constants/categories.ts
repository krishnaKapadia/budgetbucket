/** @format */

export const Categories = {
  1: {
    name: "Automotive",
    emoji: "em-car",
  },
  2: {
    name: "Food & Beverage",
    emoji: "em-wine_glass",
  },
  3: {
    name: "Groceries",
    emoji: "em-bird",
  },
  4: {
    name: "Bills & Fees",
    emoji: "em-car",
  },
  5: {
    name: "Education",
    emoji: "em-wine_glass",
  },
  6: {
    name: "Entertainment",
    emoji: "em-bird",
  },
  7: {
    name: "Family & Personal",
    emoji: "em-car",
  },
  8: {
    name: "Gifts",
    emoji: "em-wine_glass",
  },
  9: {
    name: "Healthcare",
    emoji: "em-bird",
  },
  10: {
    name: "Home",
    emoji: "em-car",
  },
  11: {
    name: "Shopping",
    emoji: "em-wine_glass",
  },
  12: {
    name: "Sport & Hobbies",
    emoji: "em-bird",
  },
  13: {
    name: "Transport",
    emoji: "em-car",
  },
  14: {
    name: "Travel",
    emoji: "em-wine_glass",
  },
  15: {
    name: "Work",
    emoji: "em-bird",
  },
  16: {
    name: "Other",
    emoji: "em-bird",
  },
  17: {
    name: "Business",
    emoji: "em-wine_glass",
  },
  18: {
    name: "Salary",
    emoji: "em-bird",
  },
  19: {
    name: "Extra Income",
    emoji: "em-bird",
  },
};

export function getCategoryName(id: string) {
  return Categories[id].name;
}

export function getCategoryEmoji(id: string) {
  return Categories[id].emoji;
}
