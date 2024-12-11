// ThemeProvider.js
import React, { useState, useContext } from 'react';
import ThemeContext from './ThemeContext';
import { Theme } from './Theme'; // Import your Theme object

const ThemeProvider = ({ children }) => {
  const [colorScheme, setColorScheme] = useState(Theme.lightA);

  const changeColorScheme = (newColorScheme) => {
    setColorScheme(newColorScheme);
  };

  const exportTheme = () => {
    return colorScheme;
  };

  return (
    <ThemeContext.Provider value={{ colorScheme, changeColorScheme, exportTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
    return useContext(ThemeContext);
  };

export default ThemeProvider;
