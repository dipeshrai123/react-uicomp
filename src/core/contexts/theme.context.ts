import { createContext } from "react";

// @Optional - THEME CONFIG
export const DefaultThemeConfig = {
  dark: false,
  colors: {
    primaryColor: "#2196F3",
    secondaryColor: "#989898",
    highlightColor: "#EB4034",
    textColor: "#353535",
    borderColor: "#E1E1E1",
    cardColor: "#FFFFFF"
  }
};

// Default Theme Context
export const ThemeContext = createContext({});