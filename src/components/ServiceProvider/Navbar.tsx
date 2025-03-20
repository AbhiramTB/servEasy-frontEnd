import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { getRequest } from "../../utils/makeRequestInstance";
import { addServiceProvider } from "../../redux/slices/serviceProvider";
import { apiEndPointServiceProvider } from "../../utils/constant";
import { useSelector } from "react-redux";
import ThemeChange from "../User/ThemeChange";

interface NavbarProps {
  profile: string;
}

const Navbar: React.FC<NavbarProps> = ({ profile }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="sticky top-0 z-40">
      <div className="shadow-lg navbar bg-primary">
        <div className="navbar-start">
          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              className="btn btn-ghost text-primary-content"
              onClick={toggleMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

<Link to={'/'}>

<a className="font-serif text-xl btn btn-ghost text-primary-content">
            ServEasy
          </a>
</Link>
          
        </div>

        {/* Desktop menu */}

        {serviceProviderInfo.isVerified == "verified" && serviceProviderInfo.isBlocked==false  && (
          <div className="hidden navbar-center text-primary-content lg:flex">
            <ul className="px-1 menu menu-horizontal">
              <Link to={"/service-provider/dashboard"}>
                <li>
                  <a className="font-medium">Home</a>
                </li>
              </Link>
              <Link to={"/service-provider/service-management"}>
                <li>
                  <p className="font-medium">Service Management</p>
                </li>
              </Link>
              <li>
                <a className="font-medium">Booking</a>
              </li>
              <li>
                <a className="font-medium">Contact</a>
              </li>
            </ul>
          </div>
        )}

      {serviceProviderInfo.isVerified == "verified" && serviceProviderInfo.isBlocked==false  &&
        (
          <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full md:w-12 lg:w-16">
                <img alt="profile Image" src={profile} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
            >
              <li>
                {/* <a
                  className="justify-between"
                >
                  Profile
                </a> */}
              </li>
              {/* <li>
                <a>Settings</a>
              </li> */}
              <li>
                <li>
                  <a>
                    {" "}
                    <ThemeChange />
                  </a>
                </li>
                <a
                  onClick={() => {
                    localStorage.removeItem("accessToken");
                    window.location.href = "/signin";
                  }}
                >
                  Logout
                </a>{" "}
              </li>
            </ul>
          </div>
        </div>
        )
      }
      </div>
                

     
      {isMenuOpen && (
        <div className="shadow-lg lg:hidden bg-primary">
          <ul className="w-full px-4 py-2 menu menu-vertical text-primary-content">
            <li>
              <a className="py-2 font-medium">Home</a>
            </li>
            <li className="py-2">
              <details>
                <summary className="font-medium">Services</summary>
                <ul className="p-2 mt-2 rounded bg-base-100">
                  <li>
                    <a className="py-2">Add New Services</a>
                  </li>
                  <li>
                    <a className="py-2">Edit Services</a>
                  </li>
                  <li>
                    <a className="py-2">Enable/Disable</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a className="py-2 font-medium">Service Management</a>
            </li>
            <li>
              <a className="py-2 font-medium">Booking</a>
            </li>
            <li>
              <a className="py-2 font-medium">Contact</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
