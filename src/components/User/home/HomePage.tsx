import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { apiEndPoint } from '../../../utils/constant';
import LocationSearchBar from './LocationSearchBar';
import ServiceSearchBar from './ServiceSearch';
import ServiceListingCards from './ServiceListingCards';
import { IServiceHome } from '../../../utils/types/IserviceHome';
import { Link } from 'react-router-dom';
import CustomerTestimonials from './CustomerTestimonials';
import WhyCooseServEasy from './WhyCooseServEasy';
import HowItWorks from './HowItWorks';
import FilterSortComponent, { FilterSortState } from './FilterCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import SkeletonHomeCard from '../../../Skeleton/SkeletonHome';
import BecomeAServiceProviderBanner from '../../ui/BecomeAServiceProviderBanner';

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
  const [location, setLocation] = useState<Location | null>(() => {
    const savedLocation = localStorage.getItem('userLocation');
    return savedLocation ? JSON.parse(savedLocation) : null;
  });

  const [banners, setBanners] = useState<Banners | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeServiceNames, setActiveServiceNames] = useState<string[]>([]);
  const [filterState, setFilterState] = useState<FilterSortState>({
    priceSort: 'none',
    category: '',
    experienceSort: 'none',
    ratingFilter: null,
  });

  const [allServices, setAllServices] = useState<IServiceHome[]>([]);
  const [categories, setCategories] = useState<{ id: string; category: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const LIMIT = 6;

  useEffect(() => {
    if (location) {
      localStorage.setItem('userLocation', JSON.stringify(location));
    }
  }, [location]);

  useEffect(() => {
    setAllServices([]);
    setCursor(null);
    setHasMore(true);
  }, [filterState, location, searchQuery]);

  const fetchData = useCallback(async () => {
    if (loading) return;

    try {
      setLoading(true);
      const { priceSort, category, experienceSort } = filterState;

      const filters: Record<string, string> = {};
      if (category?.trim()) filters.category = category;
      if (experienceSort !== 'none') filters.experience = experienceSort.toString();
      if (priceSort !== 'none') filters.priceSort = priceSort;
      if (searchQuery?.trim()) filters.searchQuery = searchQuery;

      const params: Record<string, any> = {
        filters,
        limit: LIMIT,
        cursor,
      };

      if (location?.longitude != null && location?.latitude != null) {
        params.longitude = location.longitude;
        params.latitude = location.latitude;
      }

      const res = await axios.get(`${backendUrl}${apiEndPoint.getServices}/`, { params });

      const data = res.data.allFilterServices?.services ?? [];
      const nextCursor = res.data.allFilterServices.nextCursor;

      setActiveServiceNames(res.data.activeServiceNames || []);
      setCursor(nextCursor);
      setAllServices(prev => (cursor === null ? data : [...prev, ...data]));
      setHasMore(data.length === LIMIT);

      if (res.data.categories) {
        setCategories(res.data.categories);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  }, [filterState, location, searchQuery, cursor, backendUrl, loading]);

  useEffect(() => {
    if (allServices.length === 0 && hasMore) {
      fetchData();
    }
  }, [allServices.length, hasMore, fetchData]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get(backendUrl + apiEndPoint.getBanners);
        setBanners(res.data);
      } catch (error) {
        console.error('Failed to fetch banners:', error);
      }
    };
    fetchBanners();
  }, [backendUrl]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      {/* <section className="relative h-[500px] w-full overflow-hidden">
        <img
          className="object-cover w-full h-full"
          src={
            banners?.homeBanner?.imageUrl ||
            'https://res.cloudinary.com/dpmvvtc4j/image/upload/v1748545666/servEasy-homeBanners/servEasy-homeBanners14a3dd44-7038-4676-a5f8-294a64c0f169.jpg'
          }
          alt="Home Banner"
        />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 bg-black/40 backdrop-blur-[2px]">
          <div className="mb-8 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-md">
              {banners?.homeBanner?.title || 'SERVEASY'}
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto opacity-90">
              {banners?.homeBanner?.subtitle ||
                'Find trusted service providers near you—fast, reliable, and effortless.'}
            </p>
          </div>

          <div className="relative z-50 flex flex-col md:flex-row items-center w-full max-w-4xl bg-white rounded-xl md:rounded-full shadow-2xl p-2 md:p-1">
            <div className="w-full md:w-2/5 px-4 py-2">
              <LocationSearchBar onLocationSelect={setLocation} />
            </div>
            <div className="hidden md:block w-px h-8 bg-gray-200" />
            <div className="w-full md:w-3/5 px-4 py-2">
              <ServiceSearchBar onSearch={setSearchQuery} activeServiceNames={activeServiceNames} />
            </div>
          </div>
        </div>
      </section> */}

      <section className="relative bg-base-100">
        <img
          className="object-cover w-full h-[450px]"
          src={
            banners?.homeBanner?.imageUrl ||
            'https://res.cloudinary.com/dpmvvtc4j/image/upload/v1748545666/servEasy-homeBanners/servEasy-homeBanners14a3dd44-7038-4676-a5f8-294a64c0f169.jpg'
          }
          alt={banners?.homeBanner?.title}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-4 bg-base-100/50 backdrop-blur-sm">
          <div className="text-center text-base-content">
            <h1 className="text-[50px] font-bold text-white/90 font-sans">
              {banners?.homeBanner?.title || 'SERVEASY'}
            </h1>

            <p className="mt-2 text-lg text-white">
              {banners?.homeBanner?.subtitle ||
                'Find trusted service providers near you—fast, reliable, and effortless.'}
            </p>
          </div>

          <div className="relative z-20 flex items-center w-full max-w-2xl overflow-visible border rounded-full shadow-xl  bg-gray-100">
            <div className="relative z-30 flex items-center w-1/3 gap-2 px-4">
              <LocationSearchBar onLocationSelect={setLocation} />
            </div>

            <div className="w-px h-6 mx-2 bg-gray-300" />

            <div className="flex items-center w-2/3 gap-2 px-4 py-2">
              <ServiceSearchBar onSearch={setSearchQuery} activeServiceNames={activeServiceNames} />
            </div>
          </div>
        </div>
      </section>

      <main className="relative flex-grow bg-base-100">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 -right-4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        </div>

        <div className="container px-4 py-12 mx-auto relative z-20">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h2 className="text-3xl font-bold tracking-tight">Services Near You</h2>
            <FilterSortComponent
              setFilters={setFilterState}
              filters={filterState}
              categories={categories}
              onReset={() => {
                setFilterState({ priceSort: 'none', category: '', experienceSort: 'none', ratingFilter: null });
              }}
            />
          </div>

          <InfiniteScroll
            dataLength={allServices.length}
            next={fetchData}
            hasMore={hasMore}
            loader={
              <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 xl:grid-cols-3">
                {[...Array(3)].map((_, i) => (
                  <SkeletonHomeCard key={i} />
                ))}
              </div>
            }
            endMessage={
              allServices.length > 0 && (
                <div className="py-10 text-center text-gray-400 font-medium">
                  🎉 You've seen all services in your area!
                </div>
              )
            }
          >
            {allServices.length === 0 && !loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold">No services found</h3>
                <p className="text-gray-500">Try adjusting your filters or search area.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3 justify-items-center ">
                {allServices.map(service => (
                  <Link
                    to={`/service-details/${service._id}`}
                    key={service._id}
                    className="transition-transform duration-300 hover:-translate-y-2"
                  >
                    <ServiceListingCards service={service} />
                  </Link>
                ))}
                {loading && allServices.length === 0 && (
                  <>
                    <SkeletonHomeCard />
                    <SkeletonHomeCard />
                    <SkeletonHomeCard />
                  </>
                )}
              </div>
            )}
          </InfiniteScroll>
        </div>
      </main>

      <section className="bg-base-200/50 border-t border-base-300">
        <CustomerTestimonials />
        <WhyCooseServEasy />
        <HowItWorks />
        <BecomeAServiceProviderBanner />
      </section>
    </div>
  );
};

export default HomePage;
