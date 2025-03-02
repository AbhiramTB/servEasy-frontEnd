import { useEffect } from "react";
import SkeletonHome from "../../Skeleton/SkeletonHome";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/AxiosInstance";
import { addUser } from "../../redux/slices/userSlice";
import { useDispatch,useSelector } from "react-redux";
import { apiEndPoint } from "../../utils/constant";
import { AppDispatch } from "../../redux/store";
import {RootState} from "../../redux/store"
const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {
    getUserProfile();
  },[]);

  const getUserProfile = async () => {
    try {
      
      const user: any = await axiosInstance.get(apiEndPoint.getUserProfile);
      console.log(user);
       
      if (user) {
        
        dispatch(addUser(user.data.data));
      }
    } catch (error) {
    console.log(error);
    }
  };
  // console.log(user);
  
  return (
    <>
            <h1 className="text-red-700 bg-yellow-300">{user.name},{user.email}</h1>

      {user ? (
        <div className="bg-yellow-400 w-40 h-40">
        <h1 className="text-red-700 bg-yellow-300">{user.name}</h1>
        </div>
      ) : (
        <Link to={"/signin"}>
          {" "}
          <div className="mt-10 flex flex-row flex-wrap justify-center">
            <SkeletonHome />
            <SkeletonHome />
            <SkeletonHome />
            <SkeletonHome />
            <SkeletonHome />
            <SkeletonHome />
            <SkeletonHome />
            <SkeletonHome />
          </div>
        </Link>
      )}
    </>
  );
};

export default Home;
