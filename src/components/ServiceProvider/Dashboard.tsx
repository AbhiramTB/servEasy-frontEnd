import Navbar from "./Navbar";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import PendingVerificationCard from "./pendingVerification";
const Dashboard = () => {
  const serviceProviderInfo:any= useSelector(
    (state: RootState) => state.serviceProvider
  );
  <Navbar profile={serviceProviderInfo.profileImage} ></Navbar>

  console.log(serviceProviderInfo);

  return (
    <div>
          <PendingVerificationCard email={serviceProviderInfo.serviceProviderEmail}/>
     </div>
  );
};

export default Dashboard;