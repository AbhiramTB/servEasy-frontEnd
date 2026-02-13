import { useState, useCallback, useEffect } from 'react';
import lodash from 'lodash';
import { MapPin, Loader2, X } from 'lucide-react';
import { getRequest } from '../../../../utils/makeRequestInstance';
import { apiEndPoint } from '../../../../utils/constant';

export interface Location {
  address: string;
  latitude: number;
  longitude: number;
}

interface Props {
  onLocationSelect: (location: Location | null) => void;
}

const LocationSearchBar: React.FC<Props> = ({ onLocationSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const debounce = lodash.debounce;

  useEffect(() => {
    const stored = localStorage.getItem('selected_location');
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored);

      const latitude = Number(parsed.latitude);
      const longitude = Number(parsed.longitude);

      if (Number.isNaN(latitude) || Number.isNaN(longitude)) return;

      const location: Location = {
        address: parsed.address,
        latitude,
        longitude,
      };

      setQuery(location.address);
      onLocationSelect(location);
    } catch {
      console.warn('Invalid stored location');
    }
  }, [onLocationSelect]);

  const fetchLocations = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);

    try {
      const response = await getRequest(`${apiEndPoint.locationAutocomplete}?query=${searchTerm}`);
     
      const normalized: Location[] = (response.data.suggestions || [])
        .map((place: any) => {
          const latitude = Number(place.latitude ?? place.lat ?? place.coordinates?.[1]);

          const longitude = Number(place.longitude ?? place.lng ?? place.lon ?? place.coordinates?.[0]);

          if (Number.isNaN(latitude) || Number.isNaN(longitude)) return null;

          return {
            address: place.address ?? place.display_name ??"",
            latitude,
            longitude,
          };
        })
        .filter(Boolean);

      setResults(normalized);
    } catch (error) {
      console.error('Error fetching locations:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedFetchLocations = useCallback(debounce(fetchLocations, 500), []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (!value) {
      setResults([]);
      onLocationSelect(null);
      localStorage.removeItem('selected_location');
      return;
    }

    debouncedFetchLocations(value);
  };

  const handleSuggestionClick = (location: Location) => {
    setQuery(location.address);
    onLocationSelect(location);
    localStorage.setItem('selected_location', JSON.stringify(location));
    setResults([]);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    onLocationSelect(null);
    localStorage.removeItem('selected_location');
  };

  return (
    <div className="relative z-50 w-full">
      <div className="relative flex items-center w-full gap-2 px-4 py-2">
        <MapPin size={18} className="text-primary" />

        <input
          type="text"
          placeholder="Enter location"
          className="w-full text-sm bg-transparent outline-none"
          value={query}
          onChange={handleChange}
        />

        {query && !isLoading && (
          <button onClick={handleClear} className="text-muted-foreground hover:text-foreground">
            <X size={16} />
          </button>
        )}

        {isLoading && <Loader2 size={16} className="animate-spin text-primary" />}
      </div>

      {results.length > 0 && (
        <div className="absolute left-0 z-50 w-full mt-2 border shadow-xl top-full bg-base-100 border-border rounded-xl">
          <ul className="overflow-y-auto max-h-60">
            {results.map((location, index) => (
              <li
                key={index}
                className="flex items-start gap-2 px-4 py-2.5 hover:bg-primary hover:text-primary-content cursor-pointer transition-colors"
                onClick={() => handleSuggestionClick(location)}
              >
                <MapPin size={16} className="mt-1 text-primary" />
                <div>
                  <p className="font-medium">{location.address}</p>
                  <p className="text-xs text-muted-foreground">
                    {location.latitude.toFixed(5)}, {location.longitude.toFixed(5)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LocationSearchBar;
