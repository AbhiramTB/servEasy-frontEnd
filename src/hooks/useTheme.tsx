import { useEffect, useState } from 'react';

export const useTheme = (defaultTheme: string = 'light') => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme')?.trim() || defaultTheme;
  });

  useEffect(() => {
    const trimmed = theme.trim();
    document.documentElement.setAttribute('data-theme', trimmed);
    localStorage.setItem('theme', trimmed);
  }, [theme]);

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme.trim());
  };

  return { theme, setTheme: changeTheme };
};