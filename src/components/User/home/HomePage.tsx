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
  const [categories, setCategories] = useState<{ id: string; category: string }[] | null>(null);
  const [loading, setLoading] = useState(true);

  const getAllServices = async () => {
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

  useEffect(() => {
    setLoading(true);
    getAllServices();
  }, [location]);

  useEffect(() => {
    if (!searchQuery) {
      setServices(allServices);
    } else {
      const filtered = allServices.filter(service =>
        service.serviceName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setServices(filtered);
    }
  }, [searchQuery, allServices]);

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

      <section className="bg-base bg-opacity-80 backdrop-blur-md relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        </div>

        <section className="container px-4 py-16 mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Services Near You</h2>
          {services.length === 0 ? (
            <p className="text-center text-gray-500">No services found.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map(service => (
                <Link to={`/service-details/${service._id}`} key={service._id}>
                  <ServiceListingCards service={service} />
                </Link>
              ))}
            </div>
          )}
        </section>
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
