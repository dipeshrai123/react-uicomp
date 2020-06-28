import React, { useContext, useMemo } from "react";
import PropTypes from "prop-types";
import { ThemeContext } from "../contexts";

export function ThemeProvider(props) {
  const { children, theme, toggleTheme } = props;

  const contextValue = useMemo(() => theme, [ theme ]);
  const toggleThemeFunction = useMemo(() => toggleTheme, [ toggleTheme ]);
  const value = toggleThemeFunction ? { ...contextValue, toggleTheme: toggleThemeFunction } : { ...contextValue };
  
  return (
    <ThemeContext.Provider {...{ value }}>
      { children }
    </ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.any.isRequired,
  theme: PropTypes.shape({
    dark: PropTypes.bool,
    colors: PropTypes.shape({
      primaryColor: PropTypes.string.isRequired,
      secondaryColor: PropTypes.string.isRequired,
      highlightColor: PropTypes.string.isRequired,
      textColor: PropTypes.string.isRequired,
      borderColor: PropTypes.string.isRequired,
      cardColor: PropTypes.string.isRequired
    })
  }).isRequired,
  toggleTheme: PropTypes.func
};

export function useTheme() {
  return useContext(ThemeContext);
}