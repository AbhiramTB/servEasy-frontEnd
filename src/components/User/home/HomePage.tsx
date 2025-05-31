import { useEffect, useState } from "react";
import axios from "axios";
import { apiEndPoint } from "../../../utils/constant";
import LocationSearch from "../Home1/location";
import LocationSearchBar from "./LocationSearchBar";
import ServiceSearchBar from "./ServiceSearch";

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
  const [location, setLocation] = useState<{} | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchBanners = async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const res = await axios.get(backendUrl + apiEndPoint.getBanners);
      console.log(res.data);
      setBanners(res.data);
    } catch (error) {
      console.error("Failed to fetch banners:", error);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return (
    <div>
      {banners && (
        <>
         <section className="relative bg-base-200">
  <div className="relative w-full">
    {/* Image */}
    <img
      className="object-cover w-full h-[450px]"
      src={banners.homeBanner.imageUrl}
      alt={banners.footerBanner.title}
    />

    {/* Overlay with blur and text */}
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-4 bg-base-100/60 backdrop-blur-sm">
      {/* Title and Subtitle */}
      <div className="text-center text-base-content">
        <h1 className="text-[50px] font-bold">
          {banners.homeBanner.title}
        </h1>
        <p className="mt-2 text-lg">{banners.homeBanner.subtitle}</p>
      </div>

      {/* Search Box */}
      <div className="relative z-20 flex items-center w-full max-w-2xl overflow-visible border rounded-full shadow-xl border-base-100 bg-base-200">
        {/* Location Input */}
        <div className="relative z-30 flex items-center w-1/3 gap-2 px-4 overflow-visible">
          <LocationSearchBar onLocationSelect={setLocation} />
        </div>

        {/* Divider */}
        <div className="w-px h-6 mx-2 bg-gray-300" />

        {/* Service Input */}
        <div className="flex items-center w-2/3 gap-2 px-4 py-2">
          <ServiceSearchBar onSearch={setSearchQuery} />
        </div>
      </div>
    </div>
  </div>
</section>

          {/* <section>
            <h2>Footer Banner</h2>
            <img src={banners.footerBanner.imageUrl} alt={banners.footerBanner.title} />
            <h3>{banners.footerBanner.title}</h3>
            <p>{banners.footerBanner.subtitle}</p>
          </section> */}
        </>
      )}
    </div>
  );
};

export default HomePage;
