import { useEffect, useState } from "react";
import SkeletonHome from "../../../Skeleton/SkeletonHome";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../utils/AxiosInstance";
import { addServicesUser } from "../../../redux/slices/userSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import { apiEndPoint } from "../../../utils/constant";
import LocationAutoSuggest from "./location";
import HomePageCard from "./HomePageCard";
import { Link } from "react-router-dom";
interface Location {
  address: string;
  latitude: number;
  longitude: number;
}

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const services = useSelector((state: RootState) => state.user).allServices;
  const [location, setLocation] = useState<Location | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchFocused, setSearchFocused] = useState<boolean>(false);
  const [locationFocused, setLocationFocused] = useState<boolean>(false);
  const [allServicesData, setAllServicesData] = useState<any[]>([]);
  const [showSearchPanel, setShowSearchPanel] = useState<boolean>(false);

  useEffect(() => {
    // Load location from localStorage on initial render
    const savedLocation = localStorage.getItem("userLocation");
    if (savedLocation) {
      setLocation(JSON.parse(savedLocation));
    }
    
    getAllServices();
  }, []);

  useEffect(() => {
    if (location) {
      localStorage.setItem("userLocation", JSON.stringify(location));
      getAllServices();
    }
  }, [location]);

  // Filter services based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      dispatch(addServicesUser(allServicesData));
    } else {
      const filteredServices = allServicesData.filter(service => 
        service.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      dispatch(addServicesUser(filteredServices));
    }
  }, [searchTerm, allServicesData, dispatch]);


  const getAllServices = async () => {
    setIsLoading(true);
    try {
      let res;
      if (location) {
        res = await axiosInstance.get(
          `${apiEndPoint.getServices}?userLongitude=${location.longitude}&userLatitude=${location.latitude}`
        );
      } else {
        res = await axiosInstance.get(apiEndPoint.getServices);
      }
      if (res.data.allServices) {
        setAllServicesData(res.data.allServices);
        dispatch(addServicesUser(res.data.allServices));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearLocation = () => {
    localStorage.removeItem("userLocation");
    setLocation(null);
    setSearchTerm("");
    setTimeout(() => {
      getAllServices();
    }, 100); 
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSearchPanel(false); 
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-base-100">
     <Link to={"video-call/68111138f85f2aaf44c69a5f"}> <button >video Call</button> </Link> 
      <div className="relative w-full overflow-hidden rounded-lg bg-base h-96">
        <video 
          src="https://fiverr-res.cloudinary.com/video/upload/v1/video-attachments/generic_asset/asset/706649adfb4e6c2cd5774a6b139d8943-1739467084656/Grad%20LIHP%20narrow"
          className="absolute inset-0 object-cover w-full h-full"
          autoPlay loop muted playsInline
        ></video>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 bg-gradient-to-r from-base-300/80 to-primary/50">
          <div className="container flex flex-row items-center justify-between mx-auto">
            <div className="max-w-md p-6 rounded-xl backdrop-blur-sm bg-base-100/30">
              <h1 className="mb-4 text-4xl font-extrabold text-white md:text-5xl drop-shadow-lg">
                Find Your Nearby <span className="text-secondary">Services</span>
              </h1>
              <p className="max-w-lg mb-6 text-lg text-white md:text-xl drop-shadow-md">
                Discover the best services in your area with just a few clicks
              </p>
              <button 
                onClick={() => setShowSearchPanel(!showSearchPanel)}
                className="flex items-center px-6 py-3 text-base font-medium transition-all duration-300 transform rounded-full shadow-lg bg-primary hover:bg-primary-focus hover:scale-105 text-primary-content"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {showSearchPanel ? "Hide Search" : "Start Searching"}
              </button>
            </div>
            
            <div className={`transition-all duration-500 ease-in-out transform ${showSearchPanel ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
              <div className="w-full max-w-md p-6 shadow-2xl rounded-xl bg-base-100 bg-opacity-95 backdrop-blur-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-primary">Advanced Search</h3>
                  <button 
                    onClick={() => setShowSearchPanel(false)}
                    className="p-1 rounded-full btn-ghost text-base-content hover:bg-base-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <form onSubmit={handleSearchSubmit} className="space-y-4">
                  <div>
                    <div className="flex items-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <label className="text-sm font-medium text-base-content">
                        What service are you looking for?
                      </label>
                    </div>
                    <div className="relative input-group">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                        placeholder="Search services by name..."
                        className={`w-full input input-bordered ${searchFocused ? "input-secondary" : ""}`}
                      />
                      {searchTerm && (
                        <button
                          type="button"
                          onClick={clearSearch}
                          className="absolute inset-y-0 right-0 flex items-center px-3 text-base-content/70 hover:text-secondary"
                          title="Clear search"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <label className="text-sm font-medium text-base-content">
                        Where are you looking for services?
                      </label>
                    </div>
                    <div 
                      className="relative"
                      onFocus={() => setLocationFocused(true)}
                      onBlur={() => setLocationFocused(false)}
                    >
                      <div >
                        <LocationAutoSuggest onLocationSelect={setLocation} />
                      </div>
                    </div>
                  </div>
                  
                  {location && (
                    <div className="flex items-center justify-between shadow-sm alert alert-info bg-primary/10 text-base-content border-primary/20">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="max-w-xs font-medium truncate text-base-content">{location.address}</span>
                      </div>
                      <button 
                        type="button"
                        onClick={clearLocation}
                        className="btn btn-circle btn-xs btn-primary"
                        title="Clear location"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                  
                  {(searchTerm || location) && (
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-medium text-base-content/70">Filtering by:</span>
                      {searchTerm && (
                        <div className="gap-1 badge badge-secondary">
                          <span>Service: {searchTerm}</span>
                          <button 
                            onClick={clearSearch}
                            className="ml-1 hover:text-secondary-content"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      )}
                      {location && (
                        <div className="gap-1 badge badge-primary">
                          <span>Location: {location.address.split(',')[0]}</span>
                          <button 
                            onClick={clearLocation}
                            className="ml-1 hover:text-primary-content"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="flex justify-center gap-2 mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Search
                    </button>
                    
                    {(searchTerm || location) && (
                      <button
                        type="button"
                        onClick={() => {
                          clearSearch();
                          clearLocation();
                        }}
                        className="btn btn-outline"
                      >
                        Reset All
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 py-16 mx-auto">
        <div className="flex flex-col gap-2 mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-base-content md:text-3xl">
              {searchTerm && location ? 
                <span className="flex items-center">
                  <span className="mr-2">🔍</span>
                  <span>"{searchTerm}" Services Near {location.address.split(',')[0]}</span>
                </span> : 
                searchTerm ? 
                  <span className="flex items-center">
                    <span className="mr-2">🔍</span>
                    <span>"{searchTerm}" Services</span>
                  </span> : 
                  location ? 
                    <span className="flex items-center">
                      <span className="mr-2">📍</span>
                      <span>Services Near {location.address.split(',')[0]}</span>
                    </span> : 
                    <span className="flex items-center">
                      <span className="mr-2">🌟</span>
                      <span>Popular Services</span>
                    </span>}
            </h2>
            {services.length > 0 && (
              <p className="mt-2 text-sm text-base-content/60">
                Showing {services.length} {services.length <= 1 ? 'service' : 'services'}
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSearchPanel(!showSearchPanel)}
              className="gap-2 btn btn-sm btn-secondary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </button>
            
            {(searchTerm || location) && (
              <button
                onClick={getAllServices}
                className="gap-2 btn btn-sm btn-outline btn-primary"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            )}
          </div>
        </div>

        <div className="w-full h-1 mb-8 rounded-full bg-gradient-to-r from-primary via-secondary to-accent"></div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array(8)
              .fill(null)
              .map((_, index) => (
                <SkeletonHome key={index} />
              ))}
          </div>
        ) : services.length > 0 ? (
<div className="flex flex-wrap w-full gap-6">
  {services.map((service: any) => (
    <Link 
      to={"/service-details/" + service._id} 
      key={service._id}
      className="transition-all duration-300 transform hover:scale-105 hover:shadow-xl w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(33.333%-16px)]"
    >
      <HomePageCard service={service} />
    </Link>
  ))}
</div>

        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center rounded-lg card bg-base-200">
            <div className="card-body">
              <div className="flex justify-center">
                <div className="flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-base-300 text-base-content/50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-base-content">No Services Found</h3>
              <p className="text-base-content/70">
                {searchTerm && location ? 
                  `We couldn't find any "${searchTerm}" services near ${location.address.split(',')[0]}` : 
                  searchTerm ? 
                    `We couldn't find any services matching "${searchTerm}"` : 
                    location ? 
                      `No services available near ${location.address.split(',')[0]}` : 
                      "Try searching for services in your area"}
              </p>
              {(searchTerm || location) && (
                <div className="justify-center mt-4 card-actions">
                  <button
                    onClick={() => {
                      clearSearch();
                      clearLocation();
                    }}
                    className="btn btn-primary"
                  >
                    Clear Search Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;