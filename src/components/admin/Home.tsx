// AdminHomePage.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {RootState} from "../../redux/store"
import {adminGetRequest} from "../../utils/AxiosAdmin"
import { apiEndPointAdmin } from '../../utils/constant';
import { addProfile } from '../../redux/slices/adminSlice';
const AdminHomePage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const admin=useSelector((state:RootState)=>({  userName: state.admin.userName,
    email: state.admin.email,
    phone: state.admin.phone,
    isVerified: state.admin.isVerified,}))
    console.log(admin);
    
  const dispatch=useDispatch()
  useEffect(() => {
     getUserProfile();
   },[]);

   const getUserProfile = async () => {
    try {
      
      const res = await adminGetRequest(apiEndPointAdmin.getPrfoile)

      console.log(res);
        
        dispatch(addProfile(res.data.data))
    } catch (error) {
    console.log(error);
    }
  };

 

  return (
    <div className="min-h-screen text-base-content bg-base">
    
     

      <main className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="mt-1 text-primary">Welcome back, {admin.userName}. </p>
        </div>

   

      
      </main>
    </div>
  );
};

export default AdminHomePage;

