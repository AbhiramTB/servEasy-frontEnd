// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import { apiEndPoint } from "../../../utils/constant";
// // import LocationSearchBar from "./LocationSearchBar";
// // import ServiceSearchBar from "./ServiceSearch";
// // import axiosInstance from "../../../utils/AxiosInstance";
// // import ServiceListingCards from "./ServiceListingCards";
// // import { IServiceHome } from "../../../utils/types/IserviceHome";
// // import { Link } from "react-router-dom";
// // import BrowseCategories from "./BrowseCategories";
// // import CustomerTestimonials from "./CustomerTestimonials";
// // import WhyCooseServEasy from "./WhyCooseServEasy";
// // import HowItWorks from "./HowItWorks";
// // import HomePageShimmer from "../../../Skeleton/HomeSkelteon";
// // import FilterSortComponent, { FilterSortState } from "./FilterCard";
// // import InfiniteScroll from 'react-infinite-scroll-component';
// // import { HotToastError } from "../../../utils/notificationToast";
// // import { Toaster } from "react-hot-toast";
// // import { log } from "console";


// // interface Location {
// //   address: string;
// //   latitude: number;
// //   longitude: number;
// // }

// // interface BannerData {
// //   imageUrl: string;
// //   title: string;
// //   subtitle: string;
// //   isActive: boolean;
// //   _id: string;
// // }

// // interface Banners {
// //   homeBanner: BannerData;
// //   footerBanner: BannerData;
// // }

// // const HomePage = () => {
// //   const [banners, setBanners] = useState<Banners | null>(null);
// //   const [location, setLocation] = useState<Location | null>(null);
// //   const [searchQuery, setSearchQuery] = useState("");
// //  const [filterState, setFilterState] = useState<FilterSortState>({ 
// //     priceSort: 'none', 
// //     category: '', 
// //     experienceSort: 'none', 
// //     ratingFilter:null 
// //   });

// //   const [allServices, setAllServices] = useState<IServiceHome[]>([]);
// //   const [categories, setCategories] = useState<{ id: string; category: string }[] |[]>([]);
// //   const [loading, setLoading] = useState(false);
// // const LIMIT =2;
// //   const [cursor, setCursor] = useState<string | null>(null);
// //   const [hasMore, setHasMore] = useState(true);

// //       const backendUrl = import.meta.env.VITE_BACKEND_URL;

 



// //  useEffect(() => {
// //     setAllServices([]);
// //     setCursor(null);
// //     setHasMore(true);
// //   }, [filterState, location, searchQuery]);

// //   const fetchData = async () => {
// //     if (!hasMore) return;

// //     try {
// //       const { priceSort, category, experienceSort } = filterState;

// //       const filters: Record<string, string> = {};
// //       if (category?.trim()) filters.category = category;
// //       if (experienceSort !== "none") filters.experience = experienceSort.toString();
// //       if (priceSort !== "none") filters.priceSort = priceSort;
// //       if (searchQuery?.trim()) filters.searchQuery = searchQuery;

// //       const params: Record<string, any> = {
// //         filters,
// //         limit: LIMIT,
// //         cursor,
// //       };

// //       if (location?.longitude != null && location?.latitude != null) {
// //         params.longitude = location.longitude;
// //         params.latitude = location.latitude;
// //       }

// //       const res = await axios.get(`${backendUrl}${apiEndPoint.getServices}/`, {
// //         params,
// //       });

// //       const data = res.data.allFilterServices?.services ?? [];
// //       const nextCursor = res.data.nextCursor ?? null;

// //       setAllServices((prev) => [...prev, ...data]);
// //       setCursor(nextCursor);
// //       setHasMore(data.length === LIMIT); // Stop if less than limit

// //       if (res.data.categories) {
// //         setCategories(res.data.categories);
// //       }
// //     } catch (error) {
// //       console.error("Error while fetching filtered services:", error);
// //     }
// //   };




// // // const fetchData = async () => {
// // //   if (!hasMore) return;

// // //   try {
// // //     const { priceSort, category, experienceSort } = filterState;

// // //     const filters: Record<string, string> = {};

// // //     if (category?.trim()) filters.category = category;
// // //     if (experienceSort !== 'none') filters.experience = experienceSort.toString();
// // //     if (priceSort !== 'none') filters.priceSort = priceSort;
// // //     if (searchQuery?.trim()) filters.searchQuery = searchQuery;

// // //     const params: Record<string, any> = {
// // //       filters,
// // //       limit: LIMIT,
// // //       cursor,
// // //     };

// // //     if (location?.longitude != null && location?.latitude != null) {
// // //       params.longitude = location.longitude;
// // //       params.latitude = location.latitude;
// // //     }

// // //     const res = await axios.get(`${backendUrl}${apiEndPoint.getServices}/`, {
// // //       params,
// // //     });

// // //     const data = res.data.allFilterServices?.services ?? [];
// // //     const nextCursor = res.data.nextCursor ?? null;

// // //     setAllServices((prev) => [...prev, ...data]);
// // //     setCursor(nextCursor);
// // //     setHasMore(data.length === LIMIT); // only true if we got a full batch

// // //     if (res.data.categories) {
// // //       setCategories(res.data.categories);
// // //     }
// // //   } catch (error) {
// // //     console.error("Error while fetching filtered services:", error);
// // //   }
// // // };

// // // useEffect(() => {
// // //   const resetAndFetch = async () => {
// // //     setAllServices([]);
// // //     setCursor(null);
// // //     setHasMore(true);
// // //   };
// // //   resetAndFetch();
// // // }, [filterState, searchQuery, location]);
// // // useEffect(() => {
// // //   const resetAndFetch = async () => {
// // //     setAllServices([]);     // 🔁 Reset old services
// // //     setCursor(null);        // 🔁 Reset cursor
// // //     setHasMore(true);       // 🔁 Reset hasMore to allow scrolling
// // //     await fetchData();      // 🔁 Trigger fresh fetch
// // //   };

// // //   resetAndFetch();
// // // }, [filterState, searchQuery, location]);


  


// //   const fetchBanners = async () => {
// //     try {
// //       const backendUrl = import.meta.env.VITE_BACKEND_URL;
// //       const res = await axios.get(backendUrl + apiEndPoint.getBanners);
// //       setBanners(res.data);
// //     } catch (error) {
// //       console.error("Failed to fetch banners:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchBanners();
// //   }, []);







// //   // useEffect(()=>{
// //   //    if (!location) {
// //   //   fetchMoreServices()
// //   //   // getAllServices(apiEndPoint.getServices);
// //   //   return;
// //   // }
// //   // },)


// // //   useEffect(()=>{
// // // fetchMoreServices()
// // //   },[])


// // //    const fetchMoreServices = async () => {
// // //     try {
    
// // //        let res = await axios.get(
// // //          backendUrl+apiEndPoint.getServices
         
// // //          ,{params:{ limit: LIMIT, cursor }}
// // //         );
// // //         console.log(res);

// // //                 setCategories(res.data.categories);

        

// // // const newServices: IServiceHome[] = res.data.allServices

// // //       const next = res.data.nextCursor;

// // //       setAllServices((prev) => [...prev, ...newServices]);

// // //       setCursor(next);

// // //       setHasMore(newServices.length === LIMIT);
// // //     } catch (error) {
// // //       console.error("Failed to fetch services", error);
// // //     }
// // //   };











// // if (loading) {
// //     return <HomePageShimmer />;
// //   }

// //   return (
// //     <div className="flex flex-col gap-10">
// //       <Toaster/>
// //       {/* Hero Banner */}
// //       <section className="relative bg-base-200">
// //         <img
// //           className="object-cover w-full h-[450px]"
// //           src={
// //             banners?.homeBanner?.imageUrl ||
// //             "https://res.cloudinary.com/dpmvvtc4j/image/upload/v1748545666/servEasy-homeBanners/servEasy-homeBanners14a3dd44-7038-4676-a5f8-294a64c0f169.jpg"
// //           }
// //           alt={banners?.homeBanner?.title}
// //         />
// //         <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-4 bg-base-100/60 backdrop-blur-sm">
// //           <div className="text-center text-base-content">
// //             <h1 className="text-[50px] font-bold">
// //               {banners?.homeBanner?.title || "SERVEASY"}
// //             </h1>
// //             <p className="mt-2 text-lg">
// //               {banners?.homeBanner?.subtitle ||
// //                 "Find trusted service providers near you—fast, reliable, and effortless."}
// //             </p>
// //           </div>
// //           <div className="relative z-20 flex items-center w-full max-w-2xl overflow-visible border rounded-full shadow-xl border-base-100 bg-base-200">
// //             <div className="relative z-30 flex items-center w-1/3 gap-2 px-4">
// //               <LocationSearchBar onLocationSelect={setLocation} />
// //             </div>
// //             <div className="w-px h-6 mx-2 bg-gray-300" />
// //             <div className="flex items-center w-2/3 gap-2 px-4 py-2">
// //               <ServiceSearchBar onSearch={setSearchQuery} />
// //             </div>
// //           </div>
// //         </div>
// //       </section>

      

// //       {/* Services Section */}
// //       <section className="relative overflow-hidden bg-base bg-opacity-80 backdrop-blur-md">
// //         <div className="absolute inset-0">
// //           <div className="absolute rounded-full top-20 left-10 w-72 h-72 bg-primary/10 blur-3xl animate-pulse"></div>
// //           <div className="absolute rounded-full bottom-20 right-10 w-72 h-72 bg-secondary/10 blur-3xl animate-pulse"></div>
// //           <div className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 w-96 h-96 bg-accent/5 blur-3xl"></div>
// //         </div>

// //   <div className="container px-4 pt-10 mx-auto min-h-[150vh]">
// //           <h2 className="mb-6 text-3xl font-bold text-center">Services Near You</h2>

// //           {allServices.length === 0 ? (
// //             <p className="text-center text-gray-500">No services found.</p>
// //           ) : (
// //             <InfiniteScroll
// //               dataLength={allServices.length}
// //               next={fetchData}
// //               hasMore={hasMore}
// //                scrollThreshold={0.85} // Trigger when 85% of page scrolled

// //               loader={
// //     <div className="flex items-center justify-center py-6">
// //       <svg
// //         className="w-6 h-6 mr-2 animate-spin text-primary"
// //         xmlns="http://www.w3.org/2000/svg"
// //         fill="none"
// //         viewBox="0 0 24 24"
// //       >
// //         <circle
// //           className="opacity-25"
// //           cx="12"
// //           cy="12"
// //           r="10"
// //           stroke="currentColor"
// //           strokeWidth="4"
// //         />
// //         <path
// //           className="opacity-75"
// //           fill="currentColor"
// //           d="M4 12a8 8 0 018-8v4l4-4-4-4v4a8 8 0 00-8 8z"
// //         />
// //       </svg>
// //       <span className="text-sm text-gray-500">Loading more services...</span>
// //     </div>
// //   }
// //               endMessage={
// //                 <p className="py-4 text-center text-gray-500">
// //                   No more services to show
// //                 </p>
// //               }
// //             >
// //               <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
// //                 {/* Filter as first card */}

// //                 <div className="w-full">
// //                   <FilterSortComponent
// //                     setFilters={setFilterState}
// //                     filters={filterState}
                    
// //                     categories={categories}
// //                   />
// //                 </div>

// //                 {/* Service cards */}
// //                 {allServices.map((service) => (
// //                   <Link
// //                     to={`/service-details/${service._id}`}
// //                     key={service._id}
// //                     className="w-full"
// //                   >
// //                     <ServiceListingCards service={service} />
// //                   </Link>
// //                 ))}
// //               </div>
// //             </InfiniteScroll>
// //           )}
// //         </div>
// //       </section>

// //     {hasMore && <div className="h-[200px]" />}

// //  {!hasMore && (
// //           <>
// //             <CustomerTestimonials />
// //             <WhyCooseServEasy />
// //             <HowItWorks />
// //           </>
// //         )}
    
// //     </div>
// //   );
// // };

// // export default HomePage;



// // // http://localhost:5001/getactive/services/76.32799237/11.72639615?filters[priceSort]=none&filters[experience]=none&limit=10
// // // 





import { useEffect, useState } from "react";
import axios from "axios";
import { apiEndPoint } from "../../../utils/constant";
import LocationSearchBar from "./LocationSearchBar";
import ServiceSearchBar from "./ServiceSearch";
import ServiceListingCards from "./ServiceListingCards";
import { IServiceHome } from "../../../utils/types/IserviceHome";
import { Link } from "react-router-dom";
import CustomerTestimonials from "./CustomerTestimonials";
import WhyCooseServEasy from "./WhyCooseServEasy";
import HowItWorks from "./HowItWorks";
import HomePageShimmer from "../../../Skeleton/HomeSkelteon";
import FilterSortComponent, { FilterSortState } from "./FilterCard";
import InfiniteScroll from 'react-infinite-scroll-component';
import SkeletonHomeCard from "../../../Skeleton/SkeletonHome";


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
  const [activeServiceNames,setActiveServiceNames]=useState<string[]|[]>([])
 const [filterState, setFilterState] = useState<FilterSortState>({ 
    priceSort: 'none', 
    category: '', 
    experienceSort: 'none', 
    ratingFilter:null 
  });

  const [allServices, setAllServices] = useState<IServiceHome[]>([]);
  const [categories, setCategories] = useState<{ id: string; category: string }[] |[]>([]);
  const [loading, setLoading] = useState(false);
const LIMIT =3;
  const [cursor, setCursor] = useState<string |null>(null);
  const [hasMore, setHasMore] = useState(true);

      const backendUrl = import.meta.env.VITE_BACKEND_URL;

 



 useEffect(() => {
    setAllServices([]);
    setCursor(null);
    setHasMore(true);


  }, [filterState, location, searchQuery]);



  useEffect(() => {
  if (allServices.length === 0 && hasMore) {
    fetchData();
  }
}, [allServices.length, hasMore]);

  const fetchData = async () => {
    if (!hasMore) return;

    try {
      setLoading(true)
      const { priceSort, category, experienceSort } = filterState;

      const filters: Record<string, string> = {};
      if (category?.trim()) filters.category = category;
      if (experienceSort !== "none") filters.experience = experienceSort.toString();
      if (priceSort !== "none") filters.priceSort = priceSort;
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

      const res = await axios.get(`${backendUrl}${apiEndPoint.getServices}/`, {
        params,
      });
      console.log(res.data)
console.log(res.data.allFilterServices);
setActiveServiceNames(res.data.
activeServiceNames
)
      const data = res.data.allFilterServices?.services ?? [];
      const nextCursor = res.data.allFilterServices.nextCursor;

     
          setCursor(nextCursor);
                console.log("seted cursor"+cursor);
                
      setAllServices((prev) => [...prev, ...data]);
      setHasMore(data.length === LIMIT); 

      if (res.data.categories) {
        setCategories(res.data.categories);
      }
    } catch (error) {
      console.error("Error while fetching filtered services:", error);
    }finally{
      setLoading(false)
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














  return (
    <div className="flex flex-col gap-10">
      {/* Hero Banner */}
      <section className="relative bg-base-200">
        <img
          className="object-cover w-full h-[450px]"
          src={
            banners?.homeBanner?.imageUrl ||
            "https://res.cloudinary.com/dpmvvtc4j/image/upload/v1748545666/servEasy-homeBanners/servEasy-homeBanners14a3dd44-7038-4676-a5f8-294a64c0f169.jpg"
          }
          alt={banners?.homeBanner?.title}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-4 bg-base-100/60 backdrop-blur-sm">
          <div className="text-center text-base-content">
            <h1 className="text-[50px] font-bold">
              {banners?.homeBanner?.title || "SERVEASY"}
            </h1>
            <p className="mt-2 text-lg">
              {banners?.homeBanner?.subtitle ||
                "Find trusted service providers near you—fast, reliable, and effortless."}
            </p>
          </div>
          <div className="relative z-20 flex items-center w-full max-w-2xl overflow-visible border rounded-full shadow-xl border-base-100 bg-base-200">
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


      

      {/* Services Section */}
      <section className="relative overflow-hidden bg-base bg-opacity-80 backdrop-blur-md">
        <div className="absolute inset-0">
          <div className="absolute rounded-full top-20 left-10 w-72 h-72 bg-primary/10 blur-3xl animate-pulse"></div>
          <div className="absolute rounded-full bottom-20 right-10 w-72 h-72 bg-secondary/10 blur-3xl animate-pulse"></div>
          <div className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 w-96 h-96 bg-accent/5 blur-3xl"></div>
        </div>

  <div className="container px-4 pt-10 mx-auto min-h-[150vh]">
          <h2 className="mb-6 text-3xl font-bold text-center">Services Near You</h2>
                    
          
          
            <InfiniteScroll
              dataLength={allServices.length}
              next={fetchData}
              hasMore={hasMore}
               scrollThreshold={0.85} // Trigger when 85% of page scrolled

              loader={
    <div className="flex items-center justify-center py-6">
      <svg
        className="w-6 h-6 mr-2 animate-spin text-primary"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4l4-4-4-4v4a8 8 0 00-8 8z"
        />
      </svg>
      <span className="text-sm text-gray-500">Loading more services...</span>
    </div>
  }
              endMessage={ 
                <p className="py-4 text-center text-gray-500">
                  No more services to show
                </p>
              }
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {/* Filter as first card */}



                <div className="w-full">
                  <FilterSortComponent
                    setFilters={setFilterState}
                    filters={filterState}
                    
                    categories={categories}
                  />
                </div>

                 
                {allServices.length === 0 ? 
               
                loading?(
                  <> 
 <SkeletonHomeCard/>
<SkeletonHomeCard/>

<SkeletonHomeCard/>

<SkeletonHomeCard/>

<SkeletonHomeCard/>
                  </>



                ): (<div className="card  w-full h-[500px] group  ">
            <p className="text-center text-gray-500">No services found.</p>

                  </div>)
          : ( allServices.map((service) => (
                  <Link
                    to={`/service-details/${service._id}`}
                    key={service._id}
                    className="w-full"
                  >
                    <ServiceListingCards service={service} />
                  </Link>
                )))}
              </div>
            </InfiniteScroll>
          
        </div>
      </section>

    {hasMore && <div className="h-[200px]" />}

 {!hasMore && (
          <>
            <CustomerTestimonials />
            <WhyCooseServEasy />
            <HowItWorks />
          </>
        )}
    
    </div>
  );
};

export default HomePage;



