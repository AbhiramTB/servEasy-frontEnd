import Navbar from "./Navbar";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import PendingVerificationCard from "./pendingVerification";
const Dashboard = () => {
  const serviceProviderInfo = useSelector(
    (state: RootState) => state.serviceProvider
  );
  console.log(serviceProviderInfo);

  return (
    <div>
      <Navbar profile={serviceProviderInfo.profileImage} ></Navbar>
          <PendingVerificationCard email={serviceProviderInfo.serviceProviderEmail}/>
     </div>
  );
};

export default Dashboard;
