import { useEffect, useState } from "react";
import SkeletonHome from "../../../Skeleton/SkeletonHome";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axiosInstance from "../../../utils/AxiosInstance";
import { addServicesUser } from "../../../redux/slices/userSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import { apiEndPoint } from "../../../utils/constant";
import LocationAutoSuggest from "./location";
import HomePageCard from "./HomePageCard";

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

      {services.length > 0 ? (
        <div className="flex flex-wrap mt-28">
          {services.map((service: any) => (
            <div>
              <Link to={"/service-details/"+service._id}>
                <HomePageCard service={service} />
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-row flex-wrap justify-center mt-10">
          {Array(8)
            .fill(null)
            .map((_, index) => (
              <div>
                <SkeletonHome key={index} />
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default Home;
