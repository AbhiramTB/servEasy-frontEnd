import { useEffect } from "react";
import { apiEndPoint } from "../utils/constant";
import { getRequest } from "../utils/makeRequestInstance";
import { addUser } from "../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const useFetchUserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!user || !user._id) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const res = await getRequest(apiEndPoint.getUserProfile);
      if (res.data?.user) {
        dispatch(addUser(res.data.user));
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };
};
