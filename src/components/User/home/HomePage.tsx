import { useEffect, useState } from "react";
import axios from "axios";
import { apiEndPoint } from "../../../utils/constant";
import LocationSearchBar from "./LocationSearchBar";
import ServiceSearchBar from "./ServiceSearch";
import axiosInstance from "../../../utils/AxiosInstance";
import ServiceListingCards from "./ServiceListingCards";
import { IServiceHome } from "../../../utils/types/IserviceHome";
import { Link } from "react-router-dom";
import BrowseCategories from "./BrowseCategories";
import CustomerTestimonials from "./CustomerTestimonials";
import WhyCooseServEasy from "./WhyCooseServEasy";
import HowItWorks from "./HowItWorks";
import HomePageShimmer from "../../../Skeleton/HomeSkelteon";
import FilterSortComponent, { FilterSortState } from "./FilterCard";

interface Location {
  address: string;
  latitude: number;
  longitude: number;
}

interface BannerData {
  imageUrl: string;
  title: string;
  subtitle: string;
  isActive: boolean;
  _id: string;
}

interface Banners {
  homeBanner: BannerData;
  footerBanner: BannerData;
}

const HomePage = () => {
  const [banners, setBanners] = useState<Banners | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [services, setServices] = useState<IServiceHome[]>([]);
  const [allServices, setAllServices] = useState<IServiceHome[]>([]);
  const [categories, setCategories] = useState<{ id: string; category: string }[] |[]>([]);
  const [loading, setLoading] = useState(true);

 const [filterState, setFilterState] = useState<FilterSortState>({ 
    priceSort: 'none', 
    category: '', 
    experienceSort: 'none', 
    ratingFilter:null 
  });

  

useEffect(() => {
  if (!location) {
    getAllServices(apiEndPoint.getServices);
    return;
  }

  // If no filters are applied
  const noFiltersApplied =
    !searchQuery &&
    !filterState.category &&
    filterState.experienceSort === "none" &&
    filterState.priceSort === "none" &&
    filterState.ratingFilter === null;

  let api = `${apiEndPoint.getServices}?userLongitude=${location.longitude}&userLatitude=${location.latitude}`;

  if (noFiltersApplied) {
    getAllServices(api);
  } else {
    // Add filters dynamically
    const params = new URLSearchParams();

    if (filterState.category) params.append("category", filterState.category);
    if (filterState.experienceSort !== "none") params.append("experienceSort", filterState.experienceSort);
    if (filterState.priceSort !== "none") params.append("priceSort", filterState.priceSort);
    if (filterState.ratingFilter !== null) params.append("ratingFilter", filterState.ratingFilter.toString());
    if (searchQuery) params.append("searchQuery", searchQuery);

    // Combine API with filters
    const filteredApi = `${api}&${params.toString()}`;
    getAllServices(filteredApi);
  }
}, [filterState, searchQuery, location]);

  const getAllServices = async (api:string) => {
    try {
      let res = await axiosInstance.get(
          api
        );
      console.log(res.data.allServices);
      
      if (res.data.allServices) {
        setAllServices(res.data.allServices);
        setServices(res.data.allServices);
        setCategories(res.data.categories);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBanners = async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const res = await axios.get(backendUrl + apiEndPoint.getBanners);
      setBanners(res.data);
    } catch (error) {
      console.error("Failed to fetch banners:", error);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);












  const onClickCategory = (name: string) => {
    const filtered = allServices.filter(service => service.category === name);
    setServices(filtered);
  };

  // Show shimmer while loading
  if (loading ) {
    return <HomePageShimmer />;
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Hero Banner */}
      <section className="relative bg-base-200">
        <img
          className="object-cover w-full h-[450px]"
          src={banners?.homeBanner?.imageUrl ||"https://res.cloudinary.com/dpmvvtc4j/image/upload/v1748545666/servEasy-homeBanners/servEasy-homeBanners14a3dd44-7038-4676-a5f8-294a64c0f169.jpg"}
          alt={banners?.homeBanner.title}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-4 bg-base-100/60 backdrop-blur-sm">
          <div className="text-center text-base-content">
            <h1 className="text-[50px] font-bold">{banners?.homeBanner.title||"SERVEASY"}</h1>
            <p className="mt-2 text-lg">{banners?.homeBanner.subtitle||"Find trusted service providers near you—fast, reliable, and effortless."}</p>
          </div>
          <div className="relative z-20 flex items-center w-full max-w-2xl overflow-visible border rounded-full shadow-xl border-base-100 bg-base-200">
            <div className="relative z-30 flex items-center w-1/3 gap-2 px-4">
              <LocationSearchBar onLocationSelect={setLocation} />
            </div>
            <div className="w-px h-6 mx-2 bg-gray-300" />
            <div className="flex items-center w-2/3 gap-2 px-4 py-2">
              <ServiceSearchBar onSearch={setSearchQuery} />
            </div>
          </div>
        </div>
      </section>

      {categories && (
        <div className="z-50">
          <BrowseCategories
            categories={categories}
            onClickCategory={onClickCategory}
            onClearCategory={() => setServices(allServices)}
          />
        </div>
      )}

      <section className="relative overflow-hidden bg-base bg-opacity-80 backdrop-blur-md">
        <div className="absolute inset-0">
          <div className="absolute rounded-full top-20 left-10 w-72 h-72 bg-primary/10 blur-3xl animate-pulse"></div>
          <div className="absolute rounded-full bottom-20 right-10 w-72 h-72 bg-secondary/10 blur-3xl animate-pulse"></div>
          <div className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 w-96 h-96 bg-accent/5 blur-3xl"></div>
        </div>


<div className="container px-4 py-10 mx-auto">
  <h2 className="mb-6 text-3xl font-bold text-center">Services Near You</h2>

  {allServices.length === 0 ? (
    <p className="text-center text-gray-500">No services found.</p>
  ) : (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      
      {/* Filter component as first grid item */}
      <div className="w-80 h-[500px]">
        <FilterSortComponent setState={setFilterState} categories={categories} />
      </div>

      {/* Map through services normally */}
      {allServices.map(service => (
        <Link to={`/service-details/${service._id}`} key={service._id}>
          <ServiceListingCards service={service} />
        </Link>
      ))}

    </div>
  )}
</div>

      </section>

      <CustomerTestimonials />
      <div>
        <WhyCooseServEasy />
        <HowItWorks />
      </div>
    </div>
  );
};

export default HomePage;
