import { Search, X } from 'lucide-react';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface SearchComponentProps {
  setSearch: Dispatch<SetStateAction<string>>;
  searchVal: string;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ setSearch, searchVal }) => {
  const [debounce, setDebounce] = useState('');
  useEffect(() => {
    if (!debounce.trim()) {
      setSearch(""); 
      
      return;
    }
    const handler = setTimeout(() => {
      setSearch(debounce);
    }, 500);

    return () => clearTimeout(handler);
  }, [debounce, setSearch]);

  return (
    <div>
      <div className="relative flex w-full max-w-md">
        <input
          className="w-full p-2 pr-12 border rounded-md border-primary"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDebounce(e.target.value)}
          value={debounce}
          type="text"
          placeholder="Search..."
        />
        {!searchVal ? (
          <button disabled={true} className="absolute top-0 right-0 h-full px-4 py-2 text-primary">
            <Search size={18} />
          </button>
        ) : (
          <button
            className="absolute top-0 right-0 h-full px-4 py-2 text-warning"
            onClick={() => {
              setSearch('');
              setDebounce('');
            }}
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
