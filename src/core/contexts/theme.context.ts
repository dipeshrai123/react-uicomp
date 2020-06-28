import { createContext } from "react";

type colorsType = {
  backgroundColor: string;
  primaryColor: string;
  secondaryColor: string;
  highlightColor: string;
  textColor: string;
  borderColor: string;
  cardColor: string;
};

interface DefaultThemeConfigParams {
  dark: boolean;
  colors: colorsType;
}

export const DefaultThemeConfig: DefaultThemeConfigParams = {
  dark: false,
  colors: {
    backgroundColor: "#F8F8F8",
    primaryColor: "#2196F3",
    secondaryColor: "#989898",
    highlightColor: "#EB4034",
    textColor: "#353535",
    borderColor: "#E1E1E1",
    cardColor: "#FFFFFF",
  },
};

export const ThemeContext = createContext({});
