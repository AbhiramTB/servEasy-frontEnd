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
  const services=null
  return (
    <>
            

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
