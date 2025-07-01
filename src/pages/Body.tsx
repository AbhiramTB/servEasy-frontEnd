import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/User/Navbar';
import Footer from '../components/ui/Footer';

const Body = () => {
  const location = useLocation();
   
  const shouldHideFooter = location.pathname.startsWith('/chat');
  console.log(location.pathname.startsWith('/chat'))
  return (
    <div>
      <Navbar />
      <Outlet />
      {!shouldHideFooter && <Footer />}
    </div>
  );
};

export default Body;
