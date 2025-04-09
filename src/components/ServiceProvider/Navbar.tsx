import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getRequest } from "../../utils/makeRequestInstance";
import { addServiceProvider } from "../../redux/slices/serviceProvider";
import { apiEndPointServiceProvider } from "../../utils/constant";
import ThemeChange from "../admin/ThemeChange";

interface NavbarProps {
  profile: string;
}

const Navbar: React.FC<NavbarProps> = ({ profile }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const serviceProviderInfo = useSelector(
    (state: RootState) => state.serviceProvider
  );
  const dispatch = useDispatch();

  useEffect(() => {
    getServiceProvider();
  }, []);

  const getServiceProvider = async () => {
    try {
      const res = await getRequest(
        apiEndPointServiceProvider.getServiceProvider
      );
      dispatch(addServiceProvider(res.data.serviceProvider));
    } catch (error) {
      console.error("Error fetching service provider:", error);
    }
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

          {/* Logo */}
          <Link to="/">
            <p className="font-serif text-xl btn btn-ghost text-primary-content">
              ServEasy
            </p>
          </Link>
        </div>

        {/* Desktop menu */}
        {serviceProviderInfo.isVerified === "verified" &&
          serviceProviderInfo.isBlocked === false && (
            <div className="hidden navbar-center text-primary-content lg:flex">
              <ul className="px-1 menu menu-horizontal">
                <li>
                  <Link
                    to="/service-provider/dashboard"
                    className="font-medium"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/service-provider/service-management"
                    className="font-medium"
                  >
                    Service Management
                  </Link>
                </li>
                <li>
                <Link to={'/service-provider/booked-services'}>

                  <p className="font-medium">Booking</p>
                  </Link>
                </li>
                <li>
                <Link to={'/service-provider/payment-management'}>

                  <p className="font-medium">payment management</p>
                  </Link>

                </li>
              </ul>
            </div>
          )}

        {/* Profile Section */}
        {serviceProviderInfo.isVerified === "verified" &&
          serviceProviderInfo.isBlocked === false && (
            <div className="navbar-end">
              <div className="dropdown dropdown-end">
                <button
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full md:w-12 lg:w-16">
                    <img alt="Profile Image" src={profile} />
                  </div>
                </button>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
                >
                  <li>
                    <ThemeChange />
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        localStorage.removeItem("accessToken");
                        window.location.href = "/signin";
                      }}
                      className="w-full text-left"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="shadow-lg lg:hidden bg-primary">
          <ul className="w-full px-4 py-2 menu menu-vertical text-primary-content">
            <li>
              <p className="py-2 font-medium">Home</p>
            </li>
            <li className="py-2">
              <details>
                <summary className="font-medium">Services</summary>
                <ul className="p-2 mt-2 rounded bg-base-100">
                  <li>
                    <p className="py-2">Add New Services</p>
                  </li>
                  <li>
                    <p className="py-2">Edit Services</p>
                  </li>
                  <li>
                    <p className="py-2">Enable/Disable</p>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <p className="py-2 font-medium">Service Management</p>
            </li>
            <li>
              
              <p className="py-2 font-medium">Booking</p>

            </li>
            <li>
              <p className="py-2 font-medium">Contact</p>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
