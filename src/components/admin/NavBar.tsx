import React from "react";

interface NavBarProps {
  userName: string;
  profileImage?: string;
  email: string;
}

const NavBar: React.FC<NavBarProps> = ({ userName, profileImage, email }) => {
  return (
    <div>
      <nav className="bg-gray-800 border-b border-gray-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and primary nav */}
            <div className=" flex ml-[-120px]">
              <div className="flex-shrink-0 flex items-center">
                <span className="ml-2 text-xl font-bold text-white">
                  {" "}
                  <a className="btn btn-ghost text-xl font-serif ">ServEasy</a>
                  Admin Panel
                </span>
              </div>
              <div className="hidden ml-32 sm:flex sm:items-center">
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Dashboard
                  </a>

                  <a
                    href="#"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Users
                  </a>
                  <a
                    href="#"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Products
                  </a>
                  <a
                    href="#"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Analytics
                  </a>
                  <a
                    href="#"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Settings
                  </a>
                </div>
              </div>
            </div>

            <div className="hidden  sm:flex sm:items-center space-x-3">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  className="bg-gray-700 rounded px-3 py-1.5 text-sm border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-40"
                  placeholder="Search..."
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400 absolute right-2 top-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* Notification bell */}
              <button className="p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-1 focus:ring-blue-500">
                <span className="sr-only">View notifications</span>
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </div>
              </button>

              {/* Profile dropdown */}
              <div className="relative">
                <button className="flex text-sm rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <span className="sr-only">Open user menu</span>
                  <div className="ml-5 h-8 w-8 rounded-full  flex items-center justify-center">
                    <img
                      src={
                        profileImage
                          ? profileImage
                          : "https://st2.depositphotos.com/2559749/11304/v/450/depositphotos_113040644-stock-illustration-flat-icon-isolate-on-white.jpg"
                      }
                      alt={" "}
                      className="h-full w-full rounded-full"
                    />
                    <p className="ml-3">{userName}</p>
                    {email && <p className="mt-8 ml-[-25px]">{email}</p>}
                  </div>
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="-mr-2 flex items-center sm:hidden">
              <button>
                <span className="sr-only">Open main menu</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
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
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
