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
    emoji: "em-shopping_trolley",
  },
  4: {
    name: "Bills & Fees",
    emoji: "em-receipt",
  },
  5: {
    name: "Education",
    emoji: "em-books",
  },
  6: {
    name: "Entertainment",
    emoji: "em-movie_camera",
  },
  7: {
    name: "Family & Personal",
    emoji: "em-family",
  },
  8: {
    name: "Gifts",
    emoji: "em-gift",
  },
  9: {
    name: "Healthcare",
    emoji: "em-pill",
  },
  10: {
    name: "Home",
    emoji: "em-house",
  },
  11: {
    name: "Shopping",
    emoji: "em-shopping_bags",
  },
  12: {
    name: "Sport & Hobbies",
    emoji: "em-basketball",
  },
  13: {
    name: "Transport",
    emoji: "em-taxi",
  },
  14: {
    name: "Travel",
    emoji: "em-airplane",
  },
  15: {
    name: "Work",
    emoji: "em-briefcase",
  },
  16: {
    name: "Other",
    emoji: "em-grey_question",
  },
  17: {
    name: "Business",
    emoji: "em-man_in_business_suit_levitating",
  },
  18: {
    name: "Income",
    emoji: "em-moneybag",
  },
};

export function getCategoryName(id: string | number) {
  return Categories[id].name;
}

export function getCategoryEmoji(id: string) {
  return Categories[id].emoji;
}
