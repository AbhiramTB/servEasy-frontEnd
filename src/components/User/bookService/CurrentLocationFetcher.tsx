import { useState } from "react";
import { MapPin, X } from "lucide-react";

interface CurrentLocationFetcherProps {
  setLocation: (location: { lat: number; lng: number } | null) => void;
}

const CurrentLocationFetcher: React.FC<CurrentLocationFetcherProps> = ({ setLocation }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  const fetchLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const location = { lat: latitude, lng: longitude };
        setLocation(location);
        setCoords(location);
        setLoading(false);
      },
      (err) => {
        setError("Failed to get location. Please allow location access.");
        console.error(err);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const removeLocation = () => {
    setCoords(null);
    setLocation(null);
    setError(null);
  };

  return (
    <div className="w-full max-w-md p-4 mx-auto text-center border rounded shadow">
      <button
        onClick={fetchLocation}
        className="flex items-center justify-center gap-2 mx-auto mb-4 btn btn-primary"
        disabled={loading}
      >
        <MapPin size={18} />
        {loading ? "Fetching..." : "Share Your Location"}
      </button>

      {coords && (
        <div className="font-medium text-green-600">
          <p>
            Latitude: {coords.lat.toFixed(6)}, Longitude: {coords.lng.toFixed(6)}
          </p>
          <button
            onClick={removeLocation}
            className="inline-flex items-center gap-1 mt-2 text-sm text-red-500 hover:underline"
          >
            <X size={16} /> Remove Location
          </button>
        </div>
      )}

      {error && <div className="mt-2 text-red-500">{error}</div>}
    </div>
  );
};

export default CurrentLocationFetcher;
