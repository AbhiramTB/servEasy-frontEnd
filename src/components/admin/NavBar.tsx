import { Link } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { adminGetRequest } from '../../utils/AxiosAdmin';
import { apiEndPointAdmin } from '../../utils/constant';
const NavBar = () => {
  const admin = useSelector((state: RootState) => state.admin);

  const handleLogOut = async () => {
    try {
      const res = await adminGetRequest(apiEndPointAdmin.adminLogout);
      if (res.status == 200) {
        localStorage.removeItem('adminToken');
        window.location.href = '/admin/signin';
      } else {
        console.error('Logout failed:', res.data.message);
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="border-b shadow-lg navbar bg-base-300 border-base-content/10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52">
            <li>
              <Link to="/admin/home">Dashboard</Link>
            </li>
            <li>
              <Link to="/admin/users">Users</Link>
            </li>
            <li>
              <Link to="/admin/serviceProvider">Service Providers</Link>
            </li>
            <li>
              <Link to="/admin/serviceProvider">Service Providers</Link>
            </li>
          </ul>
        </div>
        <Link to="/admin/home" className="font-serif text-xl btn btn-ghost">
          ServEasy
          {/* <span className="ml-2 font-sans text-sm">Admin Panel</span> */}
        </Link>
      </div>

      <div className="hidden navbar-center lg:flex">
        <ul className="px-1 menu menu-horizontal">
          <li>
            <Link to="/admin/home" className="text-sm font-medium">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/users" className="text-sm font-medium">
              Users
            </Link>
          </li>
          <li>
            <Link to="/admin/serviceProvider/verification" className="text-sm font-medium">
              Service Providers Verification
            </Link>
          </li>
          <li>
            <Link to="/admin/serviceProvider" className="text-sm font-medium">
              Service Providers
            </Link>
          </li>
          <li>
            <Link to="/admin/service" className="text-sm font-medium">
              service-managment
            </Link>
          </li>
          <li>
            <Link to="/admin/booking-management" className="text-sm font-medium">
              {' '}
              booking management
            </Link>
          </li>

          <li>
            <Link to="/admin/category-management" className="text-sm font-medium">
              categoryManagement{' '}
            </Link>
          </li>

          <li>
            <Link to="/admin/site-settings" className="text-sm font-medium">
              Site Settings
            </Link>
          </li>

          <li>
            <Link to="/admin/logs" className="text-sm font-medium">
              Server Logs
            </Link>
          </li>
        </ul>
      </div>

      <div className="gap-2 navbar-end">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="User avatar"
                src= {admin.profileImage}
                
              />
            </div>
          </div>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52">
            <li className="py-2 font-medium text-center">{admin.userName}</li>
            <li className="pb-2 -mt-2 text-xs text-center text-base-content/70">{admin.email || admin.phone || ''}</li>

            <li>
              <a onClick={handleLogOut}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
