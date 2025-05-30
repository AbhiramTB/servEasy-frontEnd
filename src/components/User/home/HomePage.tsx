import { useEffect, useState } from "react";
import axios from "axios";
import { apiEndPoint } from "../../../utils/constant";

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
    {/* Overlay */}
    <div className="absolute inset-0 opacity-75 bg-base-100"></div>
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
