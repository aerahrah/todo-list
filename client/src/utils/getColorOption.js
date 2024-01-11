export const colorOption = [
  "red",
  "orange",
  "yellow",
  "green",
  "sky",
  "blue",
  "violet",
  "purple",
  "pink",
  "rose",
  "white",
  "dark",
];

const colorEquivalent = {
  red: "#fca5a5",
  orange: "#fdba74",
  yellow: "#fde047",
  green: "#86efac",
  sky: "#7dd3fc",
  blue: "#93c5fd",
  violet: "#c4b5fd",
  purple: "#d8b4fe",
  pink: "#f9a8d4",
  rose: "#fb7185",
  white: "#ffffff",
  dark: "#262626",
};

const lighterColorEquivalent = {
  red: "#fecaca",
  orange: "#fed7aa",
  yellow: "#fef08a",
  green: "#bbf7d0",
  sky: "#bae6fd",
  blue: "#bfdbfe",
  violet: "#ddd6fe",
  purple: "#e9d5ff",
  pink: "#fbcfe8",
  rose: "#fecdd3",
  white: "#ffffff",
  dark: "#262626",
};

const textColorEquivalent = {
  red: "#450a0a",
  orange: "#431407",
  yellow: "#422006",
  green: "#052e16",
  sky: "#082f49",
  blue: "#172554",
  violet: "#2e1065",
  purple: "#3b0764",
  pink: "#500724",
  rose: "#4c0519",
  white: "#262626",
  dark: "#d4d4d4",
};

export const getColorOption = (color) => {
  return lighterColorEquivalent[color];
};

export const getTextColorOption = (textColor) => {
  return textColorEquivalent[textColor];
};
