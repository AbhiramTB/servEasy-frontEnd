import { useEffect, useState, useCallback, useRef } from 'react';
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
import SkeletonHomeCard from '../../../Skeleton/SkeletonHome';
import BecomeAServiceProviderBanner from '../../ui/BecomeAServiceProviderBanner';
import { getRequest } from '../../../utils/makeRequestInstance';
import EmptyState from '../../ui/EmptyState';

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
  const [location, setLocation] = useState<Location | null>(null);
  const [banners, setBanners] = useState<Banners | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeServiceNames, setActiveServiceNames] = useState<string[]>([]);
  const [filterState, setFilterState] = useState<FilterSortState>({
    priceSort: 'none',
    category: '',
    experienceSort: 'none',
    ratingFilter: null,
  });
  console.log(filterState);

  const [allServices, setAllServices] = useState<IServiceHome[]>([]);
  const [categories, setCategories] = useState<{ categoryId: string; category: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const requestIdRef = useRef(0);

  const LIMIT = 3;

  useEffect(() => {
    requestIdRef.current++;
    setAllServices([]);
    setPage(1);
    setHasMore(true);
  }, [filterState, location, searchQuery]);

  const fetchData = useCallback(async () => {
    if (loading || (page > 1 && !hasMore)) return;

    const requestId = ++requestIdRef.current;

    try {
      setLoading(true);

      const query = new URLSearchParams();
      query.append('page', page.toString());
      query.append('limit', LIMIT.toString());

      if (filterState.category?.trim()) query.append('category', filterState.category);
      if (filterState.experienceSort !== 'none') query.append('experience', filterState.experienceSort);
      if (filterState.priceSort !== 'none') query.append('priceSort', filterState.priceSort);
      if (searchQuery.trim()) query.append('searchQuery', searchQuery);

      if (location?.longitude && location?.latitude) {
        query.append('longitude', location.longitude.toString());
        query.append('latitude', location.latitude.toString());
      }

      const res = await getRequest(`${apiEndPoint.getServices}?${query.toString()}`);

      if (requestId !== requestIdRef.current) return;
      setActiveServiceNames(res.data.activeServiceNames || []);

      const services = res.data.allFilterServices?.services ?? [];
      if (res.data.categories) {
        setCategories(res.data.categories);
      }
      setAllServices(prev => (page === 1 ? services : [...prev, ...services]));
      setHasMore(services.length === LIMIT);
    } catch (error) {
      if (requestId === requestIdRef.current) {
        console.error('Error fetching services:', error);
        setHasMore(false);
      }
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  }, [filterState, location, searchQuery, page]);

  useEffect(() => {
    fetchData();
  }, [page, filterState, location, searchQuery]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await getRequest(apiEndPoint.getBanners);
        setBanners(res.data);
      } catch (error) {
        console.error('Failed to fetch banners:', error);
      }
    };
    fetchBanners();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative bg-base-100">
        <img
          className="object-cover w-full h-[300px] sm:h-[400px] lg:h-[450px]"
          src={
            banners?.homeBanner?.imageUrl ||
            'https://res.cloudinary.com/dpmvvtc4j/image/upload/v1748545666/servEasy-homeBanners/servEasy-homeBanners14a3dd44-7038-4676-a5f8-294a64c0f169.jpg'
          }
          alt={banners?.homeBanner?.title}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 sm:gap-6 px-4 bg-base-100/50 backdrop-blur-sm">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-bold text-white/90">
              {banners?.homeBanner?.title || 'SERVEASY'}
            </h1>
            <p className="mt-2 text-sm sm:text-base lg:text-lg text-white px-2">
              {banners?.homeBanner?.subtitle ||
                'Find trusted service providers near you—fast, reliable, and effortless.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch w-full max-w-2xl border rounded-2xl sm:rounded-full shadow-xl bg-gray-100">
            <div className="relative w-full sm:w-1/3 sm:min-w-[250px] px-4 py-2 sm:py-0 sm:flex sm:items-center z-20">
              <LocationSearchBar onLocationSelect={setLocation} />
            </div>
            <div className="hidden sm:block w-px bg-gray-300 self-stretch my-2" />
            <div className="relative w-full sm:w-2/3 px-4 py-2 sm:flex sm:items-center z-10">
              <ServiceSearchBar onSearch={setSearchQuery} activeServiceNames={activeServiceNames} />
            </div>
          </div>
        </div>
      </section>

      <main className="flex-grow ">
        <div className="container px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-3 sm:gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold">Services Near You</h2>
            <FilterSortComponent
              setFilters={setFilterState}
              filters={filterState}
              categories={categories}
              onReset={() =>
                setFilterState({
                  priceSort: 'none',
                  category: '',
                  experienceSort: 'none',
                  ratingFilter: null,
                })
              }
            />
          </div>

          {loading && allServices.length === 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[...Array(3)].map((_, i) => (
                <SkeletonHomeCard key={i} />
              ))}
            </div>
          ) : allServices.length === 0 ? (
            <div>
              <EmptyState
                title="No services found"
                icon="random"
                message="Try adjusting filters or location."
                showBorder={false}
              />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 justify-items-center">
                {allServices.map(service => (
                  <Link
                    key={service._id}
                    to={`/service-details/${service._id}`}
                    className="w-full max-w-sm hover:-translate-y-2 transition-transform duration-200"
                  >
                    <ServiceListingCards service={service} />
                  </Link>
                ))}
              </div>

              {hasMore && (
                <div className="flex justify-center mt-8 sm:mt-10">
                  <button
                    disabled={loading}
                    onClick={() => setPage(prev => prev + 1)}
                    className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-primary text-primary-content font-semibold hover:bg-primary/90 disabled:opacity-50 text-sm sm:text-base transition-colors"
                  >
                    {loading ? 'Loading...' : 'Load More'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <section className="bg-base-200/50 border-t">
        <CustomerTestimonials />
        <WhyCooseServEasy />
        <HowItWorks />
        <BecomeAServiceProviderBanner />
      </section>
    </div>
  );
};

export default HomePage;
