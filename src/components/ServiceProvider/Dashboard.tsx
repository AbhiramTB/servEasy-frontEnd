import Navbar from "./Navbar";
import { RootState } from "../../redux/store";
import PendingVerificationCard from "./pendingVerification";
import { useEffect } from "react";
import { getRequest } from "../../utils/makeRequestInstance";
import { apiEndPointServiceProvider } from "../../utils/constant";
import { addServiceProvider } from "../../redux/slices/serviceProvider";
import { useDispatch, useSelector } from "react-redux";
const Dashboard = () => {
  const serviceProviderInfo = useSelector(
    (state: RootState) => state.serviceProvider
  );
  const dispatch = useDispatch();

  <Navbar profile={serviceProviderInfo.profileImage}></Navbar>;
  useEffect(() => {
    getServiceProvider();
  }, []);

  const getServiceProvider = async () => {
    try {
      const res = await getRequest(
        apiEndPointServiceProvider.getServiceProvider
      );
      console.log(res.data.serviceProvider);
      
      dispatch(addServiceProvider(res.data.serviceProvider));
    } catch (error) {}
  };

  return (
    <div>
      {serviceProviderInfo.isBlocked==true &&
       <div className="text-center">
       <h2 className="text-xl font-bold"> Profile Blocked</h2>
       <p className="mt-3">Your profile has been blocked by the admin.</p>
       
     </div>
    
  

      }

{serviceProviderInfo.isVerified=="rejected" &&
       <div className="text-center">
       <h2 className="text-xl font-bold">User Profile Blocked</h2>
       <p className="mt-3">Your profile has been blocked by the admin.</p>
       
     </div>
    
  

      }

      {serviceProviderInfo.isVerified === "pending"  && (
        <PendingVerificationCard
          email={serviceProviderInfo.serviceProviderEmail}
        />
      )}

      {serviceProviderInfo.isVerified ==="verified" && serviceProviderInfo.isBlocked==false &&
          <div className="mx-auto text-center ">
          <h1 className="font-mono text-[200px] text-primary opacity-30"> Dashboard</h1>
          <p className="mt-1 text-2xl text-base-content">Welcome back,{serviceProviderInfo.serviceProviderName} </p>
        </div>
      }
    </div>
  );
};

export default Dashboard;
