import React from 'react';
<<<<<<< HEAD
import { useTheme } from '../../../hooks/useTheme'; 
=======
import { useTheme } from '../../../hooks/useTheme';
 const themeSwitchSound = new Audio("/sounds/themeSwitch.mp3")

>>>>>>> bba0d59efc976b14794191f4ec7012712d072dd6

interface ThemePickerProps {
  themes: string[];
}

const ThemePicker: React.FC<ThemePickerProps> = ({ themes }) => {
  const { theme, setTheme } = useTheme(themes[0]);
<<<<<<< HEAD

  return (
    <div className="flex flex-wrap gap-2 p-4">
      {themes.map((rawTheme) => {
=======
  return (
    <div className="flex flex-wrap gap-2 p-4">
      {(!themes || themes.length === 0) && (
        <>
          {Array(20)
            .fill(9)
            .map((i, id) => (
              <div key={i + id} className="h-10 skeleton w-28"></div>
            ))}
        </>
      )}

      {themes.map(rawTheme => {
>>>>>>> bba0d59efc976b14794191f4ec7012712d072dd6
        const trimmed = rawTheme.trim();
        return (
          <button
            key={trimmed}
<<<<<<< HEAD
            onClick={() => setTheme(trimmed)}
=======
            onClick={() => {setTheme(trimmed)
              themeSwitchSound.volume=0.5
              themeSwitchSound.play();
              themeSwitchSound.currentTime=0
            }}
>>>>>>> bba0d59efc976b14794191f4ec7012712d072dd6
            className={`px-4 py-2 rounded-full border transition ${
              theme === trimmed
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
            }`}
          >
            {trimmed.charAt(0).toUpperCase() + trimmed.slice(1)}
          </button>
        );
      })}
    </div>
  );
};

<<<<<<< HEAD
export default ThemePicker;
=======
export default ThemePicker;
>>>>>>> bba0d59efc976b14794191f4ec7012712d072dd6
