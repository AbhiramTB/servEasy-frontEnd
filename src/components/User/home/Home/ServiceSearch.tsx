import React, { useEffect, useMemo, useState } from "react";
import lodash from "lodash";
const debounce = lodash.debounce;

interface Props {
  onSearch: (query: string) => void;
  activeServiceNames: string[] | [];
}

const ServiceSearchBar: React.FC<Props> = ({ onSearch, activeServiceNames }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const debouncedUpdateSuggestions = useMemo(
    () =>
      debounce((value: string) => {
        const filtered = activeServiceNames.filter((service) =>
          service.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filtered);
      }, 300),
    [activeServiceNames]
  );

  const handleChange = (value: string) => {
    setQuery(value);
    setShowSuggestions(true);
    debouncedUpdateSuggestions(value);
  };

  const handleSelect = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion);
  };

  const handleSearchClick = () => {
    setShowSuggestions(false);
    onSearch(query);
  };

const handleClear = () => {
  setQuery("");
  setSuggestions([]);
  setShowSuggestions(false);
  onSearch(""); 
};

  useEffect(() => {
    return () => {
      debouncedUpdateSuggestions.cancel();
    };
  }, [debouncedUpdateSuggestions]);

  return (
    <div className="relative w-full px-4 py-2">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Search for services"
          className="w-full pr-8 bg-transparent outline-none text-base-content text-md"
        />

        {query && (
          <button
            className="-ml-8 text-base-content hover:text-error"
            onClick={handleClear}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 8.586l4.95-4.95a1 1 0 111.414 1.414L11.414 10l4.95 4.95a1 1 0 01-1.414 1.414L10 11.414l-4.95 4.95a1 1 0 01-1.414-1.414L8.586 10l-4.95-4.95a1 1 0 011.414-1.414L10 8.586z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}

        <button className="text-primary" onClick={handleSearchClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1110 2.5a7.5 7.5 0 016.65 14.15z"
            />
          </svg>
        </button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-2 overflow-y-auto border rounded-md shadow-lg bg-base-100 max-h-48 border-base-300">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-base-200"
              onClick={() => handleSelect(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ServiceSearchBar;
