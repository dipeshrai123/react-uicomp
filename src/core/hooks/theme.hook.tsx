import { useContext } from "react";
// eslint-disable-next-line no-unused-vars
import { ThemeContext } from "../contexts";

export function useTheme() {
  return useContext(ThemeContext);
}
