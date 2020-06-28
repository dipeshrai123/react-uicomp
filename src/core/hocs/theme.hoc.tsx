import React, { useMemo } from "react";
// eslint-disable-next-line no-unused-vars
import { ThemeContext, DefaultThemeConfigParams } from "../contexts";

interface ThemeProviderParams {
  children: React.ReactNode;
  theme: DefaultThemeConfigParams;
  toggleTheme: () => void;
}

const ThemeProvider = (props: ThemeProviderParams) => {
  const { children, theme, toggleTheme } = props;

  const contextValue = useMemo(() => theme, [theme]);
  const toggleThemeFunction = useMemo(() => toggleTheme, [toggleTheme]);
  const value = toggleThemeFunction
    ? { ...contextValue, toggleTheme: toggleThemeFunction }
    : { ...contextValue };

  return (
    <ThemeContext.Provider {...{ value }}>{children}</ThemeContext.Provider>
  );
};

export const Theme = {
  Provider: ThemeProvider,
};
