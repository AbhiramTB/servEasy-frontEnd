import { Link } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { adminGetRequest } from '../../utils/AxiosAdmin';
import { apiEndPointAdmin } from '../../utils/constant';

import { useEffect, useState } from 'react';
import ConfirmModal from '../ui/modal/ConfirmModal';
import { adminLinks } from '../../utils/constants/adminLinks';
import { LogOut } from 'lucide-react';
import { addProfile } from '../../redux/slices/adminSlice';
import { useDispatch } from 'react-redux';

const NavBar = () => {
  const dispatch=useDispatch()
  const admin = useSelector((state: RootState) => state.admin);
  const [isLogout, setisLogout] = useState<boolean>(false);




 useEffect(()=>{
    getUserProfile();

  },[])
  const getUserProfile = async () => {
    try {
      const res = await adminGetRequest(apiEndPointAdmin.getPrfoile);
      dispatch(addProfile(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };



  const handleLogOut = async () => {
    try {
      const res = await adminGetRequest(apiEndPointAdmin.adminLogout);
      if (res.status == 200) {
        localStorage.removeItem('adminToken');
        window.location.href = '/admin/sigin';
      } else {
        console.error('Logout failed:', res.data.message);
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      <ConfirmModal
        isOpen={isLogout}
        title="Log Out Confirmation"
        message="Are you sure you want to log out from your admin panel? You’ll need to sign in again to access the dashboard."
        onClose={() => setisLogout(false)}
        onConfirm={handleLogOut}
        cancelText="Stay"
        confirmText="Log Out"
      />

      <div className="sticky top-0 z-10 border-b shadow-lg sm:px-20 navbar bg-base-200 border-base-content/10">

        
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
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-60"
              >
              <NavLinks isMobile={true} />
            </ul>
          </div>

          <div className="flex flex-col items-center ">
            <Link to="/admin/home" className="text-center">
              <div className="font-serif text-2xl font-bold">
                <span>Serv</span>
                <span className="text-primary">Easy</span>
              </div>
              <span className="text-xs mt-[-15px] text-slate-500">Find your nearby services</span>
            </Link>
          </div>
        </div>

        <div className="hidden lg:flex navbar-center">
          <ul className="px-1 menu menu-horizontal">
            <NavLinks isMobile={false} />
          </ul>
        </div>

        <div className="gap-1 navbar-end">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="Admin avatar" src={admin.profileImage} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
            >
              <li className="py-2 font-medium text-center">{admin.userName}</li>
              <li className="pb-2 -mt-2 text-xs text-center text-base-content/70">
                {admin.email || admin.phone || ''}
              </li>
              <li>
                <button onClick={() => setisLogout(true)} className="flex items-center gap-2">
                  <LogOut size={16} /> Logout
                </button>
              </li>
            </ul>
          </div>
        </div>


      </div>
    </>
  );
};

function NavLinks({ isMobile }: { isMobile: boolean }) {
  return (
    <>
      {adminLinks.map(({ to, icon: Icon, label }) => (
        <li key={to}>
          {isMobile ? (
            <div className="">
              <Link to={to} className="flex items-center gap-1 px-2 py-1 ">
                <Icon size={18} />
                <p>{label}</p>
              </Link>
            </div>
          ) : (
            <div className="tooltip tooltip-bottom " data-tip={label}>
              <Link to={to} className="flex items-center gap-1 px-2 py-1 ">
                <Icon size={18} />
              </Link>
            </div>
          )}
        </li>
      ))}
    </>
  );
}

export default NavBar;
