import React from 'react';
import { useTheme } from '../../../hooks/useTheme';
 const themeSwitchSound = new Audio("/sounds/themeSwitch.mp3")


interface ThemePickerProps {
  themes: string[];
}

const ThemePicker: React.FC<ThemePickerProps> = ({ themes }) => {
  const { theme, setTheme } = useTheme(themes[0]);
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
        const trimmed = rawTheme.trim();
        return (
          <button
            key={trimmed}
            onClick={() => {setTheme(trimmed)
              themeSwitchSound.volume=0.5
              themeSwitchSound.play();
              themeSwitchSound.currentTime=0
            }}
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

export default ThemePicker;
