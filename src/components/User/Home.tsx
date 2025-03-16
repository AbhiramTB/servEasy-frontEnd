import { useEffect, useState } from "react";
import SkeletonHome from "../../Skeleton/SkeletonHome";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/AxiosInstance";
import { addUser } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { apiEndPoint } from "../../utils/constant";
import { AppDispatch } from "../../redux/store";
import { RootState } from "../../redux/store";
import LocationAutoSuggest from "./Home/location";
interface Location {
  address: string;
  latitude: number;
  longitude: number;
}

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const [location, setLocation] = useState<Location | null>(null);



  const getUserProfile = async () => {
    try {
      const res: any = await axiosInstance.get(apiEndPoint.getUserProfile);
      console.log(res.data.user);

      if (res.data.user) {
        dispatch(addUser(res.data.user));
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(user);
  const services = null;
  return (
    <>
    <div className="">

<LocationAutoSuggest onLocationSelect={setLocation}/>
    </div>
{location && (
        <div className="p-3 mt-4 bg-gray-100 border rounded-lg">
          <h3 className="font-semibold">Selected Location:</h3>
          <p>{location.address}</p>
          <p className="text-sm text-gray-600">Lat: {location.latitude}, Long: {location.longitude}</p>
        </div>
      )}
      {services ? (
      <></>
      ) : (
        <div className="flex flex-row flex-wrap justify-center mt-10">
          <SkeletonHome />
          <SkeletonHome />
          <SkeletonHome />
          <SkeletonHome />
          <SkeletonHome />
          <SkeletonHome />
          <SkeletonHome />
          <SkeletonHome />
        </div>
      )}


    </>
  );
};

export default Home;
