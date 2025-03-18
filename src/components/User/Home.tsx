import { useEffect, useState } from "react";
import SkeletonHome from "../../Skeleton/SkeletonHome";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/AxiosInstance";
import { addServicesUser } from "../../redux/slices/userSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { apiEndPoint } from "../../utils/constant";
import LocationAutoSuggest from "./Home/location";

interface Location {
  address: string;
  latitude: number;
  longitude: number;
}

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const services = useSelector((state: RootState) => state.user).allServices;
  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    const getAllServices = async () => {
      try {
        const res = await axiosInstance.get(apiEndPoint.getServices);
        if (res.data.allServices) {
          dispatch(addServicesUser(res.data.allServices));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllServices();
  }, [dispatch]);

  return (
    <>
      <div className="relative w-full overflow-hidden rounded-lg bg-base h-96">
        {/* <video 
          src="https://fiverr-res.cloudinary.com/video/upload/v1/video-attachments/generic_asset/asset/706649adfb4e6c2cd5774a6b139d8943-1739467084656/Grad%20LIHP%20narrow"
          className="absolute inset-0 object-cover w-full h-full"
          autoPlay loop muted playsInline
        ></video> */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 bg-opacity-50 ">
          <h1 className="mb-8 text-4xl font-bold text-center text-base-content md:text-5xl drop-shadow-lg">
            Find Your Nearby Services
          </h1>
          <div className="w-full max-w-md p-4 rounded-lg shadow-lg bg-base bg-opacity-20 backdrop-blur-sm">
            <LocationAutoSuggest onLocationSelect={setLocation} />
          </div>
        </div>
      </div>

   

      {services ? (
        <div className="flex flex-wrap mt-28">
          {services.map((service: any) => (
            <div key={service.id} className="max-w-sm ml-20 overflow-hidden transition-shadow duration-300">
              <div className="overflow-hidden transition-shadow duration-300 shadow-xl card bg-base-100 hover:shadow-2xl">
                <figure className="relative h-48">
                  <img 
                    src={service.serviceImage} 
                    alt={service.serviceName} 
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute top-2 right-2 badge badge-primary badge-sm">
                    {service.serviceType}
                  </div>
                </figure>
                <div className="p-4 card-body">
                  <div className="flex items-center justify-between">
                    <h2 className="truncate card-title text-base-content">
                      {service.serviceName}
                    </h2>
                    <div className={`badge badge-sm ${service.isActive ? 'badge-success' : 'badge-error'}`}>
                      {service.isActive ? 'Active' : 'Inactive'}
                    </div>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="mr-2 font-medium text-base-content/80">Category:</span>
                    <span className="text-base-content/70">{service.category}</span>
                  </div>
                  <div className="mt-1 mb-1 text-lg font-bold text-primary">
                    ₹{service.estimatedPrice.toLocaleString('en-IN')}
                  </div>
                  <p className="text-sm text-base-content/60 line-clamp-2">{service.description}</p>
                  <div className="flex items-start mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary mr-1 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-xs truncate text-base-content/70">{service.location.address}</span>
                  </div>
                  <div className="justify-end mt-3 card-actions">
                    <button className="w-full btn btn-primary btn-sm">Book Service</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-row flex-wrap justify-center mt-10">
          {Array(8).fill(null).map((_, index) => (
            <SkeletonHome key={index} />
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
