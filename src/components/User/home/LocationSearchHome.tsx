import { useState, useCallback } from 'react';
import lodash from 'lodash';
import { apiEndPoint } from '../../../utils/constant';
import { getRequest } from '../../../utils/makeRequestInstance';
import { MapPin, Search, Loader2 } from 'lucide-react';

export interface Location {
  address: string;
  latitude: number;
  longitude: number;
}

interface LocationSearchProps {
  onLocationSelect: (location: Location | null) => void;
  initialLocation?: string;
}

const LocationSearchHomePage: React.FC<LocationSearchProps> = ({ onLocationSelect, initialLocation }) => {
  const [query, setQuery] = useState<string>(initialLocation ? initialLocation : '');
  const [results, setResults] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const debounce = lodash.debounce;

  const fetchLocations = async (searchTerm: string) => {
    if (!searchTerm) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await getRequest(`${apiEndPoint.locationAutocomplete}?query=${searchTerm}`);
      setResults(response.data.suggestions);
    } catch (error) {
      console.error('Error fetching locations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedFetchLocations = useCallback(debounce(fetchLocations, 500), []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (!value) {
      onLocationSelect(null);
    }
    debouncedFetchLocations(value);
  };

  const handleSuggestionClick = (location: Location) => {
    setQuery(location.address);
    onLocationSelect(location);
    setResults([]);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    onLocationSelect(null);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary/70 dark:text-primary-foreground/70">
            <Search size={18} />
          </div>
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search for a location..."
            className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-background border-input border 
                      focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent 
                      shadow-sm text-foreground placeholder:text-muted-foreground"
          />
          {isLoading ? (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <Loader2 size={18} className="animate-spin text-primary dark:text-primary-foreground" />
            </div>
          ) : (
            query && (
              <button
                onClick={handleClear}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )
          )}
        </div>

        {results.length > 0 && (
          <div className="absolute z-[100] w-full mt-1 border rounded-lg shadow-lg bg-base-100 bg-card text-card-foreground border-border">
            <ul className="py-1 overflow-y-auto max-h-60">
              {results.map((location, index) => (
                <li
                  key={index}
                  className="px-4 py-2.5 flex items-start hover:bg-primary hover:text-primary-content cursor-pointer transition-colors duration-150"
                  onClick={() => handleSuggestionClick(location)}
                >
                  <MapPin size={18} className="mr-2 text-primary dark:text-primary hover:text-primary-content" />
                  <div>
                    <p className="font-medium">{location.address}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationSearchHomePage;
