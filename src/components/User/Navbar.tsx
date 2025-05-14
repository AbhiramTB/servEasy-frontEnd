// import { useEffect, useState } from "react";
// import ThemeChange from "../ThemeChange";
// import { getRequest } from "../../utils/makeRequestInstance";
// import { apiEndPoint, apiEndPointServiceProvider } from "../../utils/constant";
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux/store";
// import { Link, useNavigate } from "react-router-dom";
// import UserProfileModal from "./UpdateProfile";
// import { useDispatch } from "react-redux";
// import { addUser } from "../../redux/slices/userSlice";
// import { HotToastSuccess } from "../../utils/HotToasitify";
// import { MessageCircle, Bell, Menu, X } from "lucide-react";
// import { useSocketNotifications } from "../../hooks/useNotifications";

// const Navbar = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const user = useSelector((state: RootState) => state.user);

//   const [editProfile, setEditProfile] = useState<boolean>(false);
//   const [unreadMessages, setUnreadMessages] = useState<number>(0);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
//   const [scrolled, setScrolled] = useState<boolean>(false);

//   const handleNotification = (notification: any) => {
//     console.log("Received Notification:", notification);
//     // Handle your notification (e.g., show toast)
//     // toast.info(`${notification.title}: ${notification.body}`, {
//     //   position: "top-right",
//     //   autoClose: 5000,
//     //   pauseOnHover: true,
//     //   draggable: true,
//     // });
//     alert(notification.title)
//   };

//   useEffect(() => {
//     if (user._id) {
//       // Call the hook with userId and handle notifications
//       useSocketNotifications(user._id, handleNotification);
//     }
//   }, [user._id]);

//   useEffect(() => {
//     getUserProfile();
//     simulateUnreadMessages();

//     // Add scroll effect
//     const handleScroll = () => {
//       if (window.scrollY > 20) {
//         setScrolled(true);
//       } else {
//         setScrolled(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   const simulateUnreadMessages = () => {
//     setTimeout(() => {
//       setUnreadMessages(3);
//     }, 2000);
//   };

//   const handleLogOut = async () => {
//     try {
//       const res = await getRequest(apiEndPoint.logOutUser);
//       if (res.status == 200) {
//         localStorage.removeItem("accessToken");
//         window.location.href = "/signin";
//       } else {
//         console.error("Logout failed:", res.data.message);
//       }
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   const getUserProfile = async () => {
//     try {
//       const res: any = await getRequest(apiEndPoint.getUserProfile);
//       if (res.data.user) {
//         dispatch(addUser(res.data.user));
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const verifyServiceProvider = async () => {
//     try {
//       const res = await getRequest(
//         apiEndPointServiceProvider.verifyServiceProvider
//       );
//       if (res.status === 200) {
//         HotToastSuccess("verification successful");
//         navigate("/service-provider/dashboard");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <div
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//           scrolled
//             ? "bg-base-100 bg-opacity-95 shadow-lg backdrop-blur-sm"
//             : "bg-base-100"
//         } border-b navbar border-primary`}
//       >
//         <div className="flex-1">
//           <p className="font-serif text-2xl font-bold tracking-tight btn btn-ghost text-primary hover:text-primary-focus">
//             <Link to={"/"} className="flex items-center">
//               <span className="relative">
//                 Serv<span className="text-secondary">Easy</span>
//                 <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all group-hover:w-full"></span>
//               </span>
//             </Link>
//           </p>
//         </div>

//         <div className="flex md:hidden">
//           <button
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             className="p-2 mr-2 rounded-md text-primary hover:bg-base-200"
//           >
//             {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>

//         <div className="hidden md:flex md:flex-none md:gap-4">
//           {!user.serviceProvider && (
//             <Link to={"service-provider/register"}>
//               <button className="relative overflow-hidden btn btn-outline btn-primary group">
//                 <span className="relative z-10">Become a Service Provider</span>
//                 <span className="absolute inset-0 w-0 transition-all duration-300 bg-primary group-hover:w-full opacity-20"></span>
//               </button>
//             </Link>
//           )}

//           <Link to={"/chats"}>
//             <div className="relative">
//               <button
//                 className="flex items-center justify-center p-3 text-white transition-all duration-300 transform rounded-full shadow-md bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-lg hover:from-blue-600 hover:to-indigo-700 hover:scale-105"
//                 aria-label="Open Chat"
//               >
//                 <MessageCircle className="w-6 h-6" />
//               </button>

//             </div>
//           </Link>

//           {user.serviceProvider && (
//             <button
//               className="relative overflow-hidden btn btn-outline btn-secondary group"
//               onClick={() => verifyServiceProvider()}
//             >
//               <span className="relative z-10">Go to Service Dashboard</span>
//               <span className="absolute inset-0 w-0 transition-all duration-300 bg-secondary group-hover:w-full opacity-20"></span>
//             </button>
//           )}

//           <div className="dropdown dropdown-end">
//             <div
//               tabIndex={0}
//               role="button"
//               className="relative transition-all duration-300 btn btn-ghost btn-circle avatar ring-2 ring-offset-2 ring-offset-base-100 ring-primary-focus ring-opacity-60 hover:ring-opacity-100"
//             >
//               <div className="w-12 rounded-full">
//                 {user.profileImage ? (
//                   <img
//                     alt="User profile"
//                     src={user.profileImage}
//                     className="object-cover w-full h-full"
//                   />
//                 ) : (
//                   <img
//                     alt="Default avatar"
//                     src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
//                     className="object-cover w-full h-full"
//                   />
//                 )}
//               </div>
//             </div>

//             <ul
//               tabIndex={0}
//               className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-56 p-3 shadow-xl border border-primary border-opacity-20"
//             >
//               <li className="mb-1">
//                 <p
//                   className="justify-between font-medium transition-colors hover:bg-primary hover:bg-opacity-10"
//                   onClick={() => setEditProfile(true)}
//                 >
//                   Profile
//                 </p>
//               </li>
//               <li className="mb-1">
//                 <Link to={"/booked-services/"}>
//                   <a className="font-medium transition-colors hover:bg-primary hover:bg-opacity-10">Your Bookings</a>
//                 </Link>
//               </li>
//               <li className="mb-1">
//                 <p className="font-medium transition-colors hover:bg-primary hover:bg-opacity-10">
//                   <ThemeChange />
//                 </p>
//               </li>
//               <div className="my-2 border-t border-base-300"></div>
//               <li>
//                 <p
//                   onClick={() => handleLogOut()}
//                   className="font-medium transition-colors text-error hover:bg-error hover:bg-opacity-10"
//                 >
//                   Logout
//                 </p>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {mobileMenuOpen && (
//           <div className="absolute left-0 right-0 p-4 mt-1 border-b shadow-lg top-full bg-base-100 border-primary md:hidden">
//             <div className="flex flex-col space-y-3">
//               {!user.serviceProvider && (
//                 <Link to={"service-provider/register"}>
//                   <button className="w-full btn btn-sm btn-outline btn-primary">
//                     Become a Service Provider
//                   </button>
//                 </Link>
//               )}

//               <Link to={"/chats"} className="flex items-center p-2 rounded-md hover:bg-base-200">
//                 <MessageCircle className="w-5 h-5 mr-2 text-primary" />
//                 <span>Messages</span>
//                 {unreadMessages > 0 && (
//                   <span className="flex items-center justify-center w-5 h-5 ml-auto text-xs font-bold text-white bg-red-500 rounded-full">
//                     {unreadMessages}
//                   </span>
//                 )}
//               </Link>

//               {user.serviceProvider && (
//                 <button
//                   className="w-full btn btn-sm btn-outline btn-secondary"
//                   onClick={() => verifyServiceProvider()}
//                 >
//                   Go to Service Dashboard
//                 </button>
//               )}

//               <Link to={"/booked-services/"} className="flex items-center p-2 rounded-md hover:bg-base-200">
//                 <span>Your Bookings</span>
//               </Link>

//               <div
//                 className="flex items-center p-2 rounded-md cursor-pointer hover:bg-base-200"
//                 onClick={() => setEditProfile(true)}
//               >
//                 <span>Profile</span>
//               </div>

//               <div className="flex items-center p-2 rounded-md hover:bg-base-200">
//                 <ThemeChange />
//               </div>

//               <div
//                 className="flex items-center p-2 rounded-md cursor-pointer text-error hover:bg-error hover:bg-opacity-10"
//                 onClick={handleLogOut}
//               >
//                 <span>Logout</span>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="h-20"></div>

//       {editProfile && (
//         <UserProfileModal
//           user={user}
//           IsCloss={() => setEditProfile(false)}
//           getUserProfile={() => getUserProfile()}
//         />
//       )}
//     </div>
//   );
// };

// export default Navbar;

import { useEffect, useState } from "react";
import ThemeChange from "../ThemeChange";
import { getRequest } from "../../utils/makeRequestInstance";
import { apiEndPoint, apiEndPointServiceProvider } from "../../utils/constant";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Link, useNavigate } from "react-router-dom";
import UserProfileModal from "./UpdateProfile";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/slices/userSlice";
import { HotToastSuccess } from "../../utils/HotToasitify";
import { MessageCircle, Bell, Menu, X, Trash2 } from "lucide-react";
import { useSocketNotifications } from "../../hooks/useNotifications";
import toast from "react-hot-toast";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  const [editProfile, setEditProfile] = useState<boolean>(false);
  const [unreadMessages, setUnreadMessages] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  // Add notification states
  const [notifications, setNotifications] = useState<
    Array<{ id: string; message: string; timestamp: string }>
  >([]);
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);

  const handleNotification = (notification: any) => {
    console.log("Received Notification:", notification);

    // Dismiss previous toasts
    toast.dismiss();

    // Show new toast
    toast(notification.message, {
      icon: "🔔",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });

    // Add to notifications
    const newNotification = {
      id: Date.now().toString(),
      message: notification.message,
      timestamp: new Date().toLocaleString(),
    };

    setNotifications((prev) => [newNotification, ...prev]);
    setNotificationCount((prev) => prev + 1);
  };

  useSocketNotifications(user._id + "", handleNotification);

  useEffect(() => {
    getUserProfile();
    simulateUnreadMessages();

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const mockNotifications = [
      {
        id: "1",
        message: "Your service booking was confirmed",
        timestamp: new Date(Date.now() - 3600000).toLocaleString(),
      },
      {
        id: "2",
        message: "New message from service provider",
        timestamp: new Date(Date.now() - 7200000).toLocaleString(),
      },
      {
        id: "3",
        message: "Reminder: Service scheduled tomorrow",
        timestamp: new Date(Date.now() - 86400000).toLocaleString(),
      },
    ];

    setNotifications(mockNotifications);
    setNotificationCount(mockNotifications.length);
  }, []);

  const simulateUnreadMessages = () => {
    setTimeout(() => {
      setUnreadMessages(3); // Simulate unread messages
    }, 2000);
  };

  const handleLogOut = async () => {
    try {
      const res = await getRequest(apiEndPoint.logOutUser);
      if (res.status === 200) {
        localStorage.removeItem("accessToken");
        window.location.href = "/signin";
      } else {
        console.error("Logout failed:", res.data.message);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getUserProfile = async () => {
    try {
      const res: any = await getRequest(apiEndPoint.getUserProfile);
      if (res.data.user) {
        dispatch(addUser(res.data.user));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const verifyServiceProvider = async () => {
    try {
      const res = await getRequest(
        apiEndPointServiceProvider.verifyServiceProvider
      );
      if (res.status === 200) {
        HotToastSuccess("verification successful");
        navigate("/service-provider/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setNotificationCount(0);
    setShowNotifications(false);
    HotToastSuccess("All notifications cleared");
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
    setNotificationCount((prev) => prev - 1);
  };

  return (
    <div>
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-base-100 bg-opacity-95 shadow-lg backdrop-blur-sm" : "bg-base-100"} border-b navbar border-primary`}
      >
        <div className="flex-1">
        <h1>{user._id}</h1>

          <p className="font-serif text-2xl font-bold tracking-tight btn btn-ghost text-primary hover:text-primary-focus">
            <Link to={"/"} className="flex items-center">
              <span className="relative">
                Serv<span className="text-secondary">Easy</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all group-hover:w-full"></span>
              </span>
            </Link>
          </p>
        </div>

        <div className="flex md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 mr-2 rounded-md text-primary hover:bg-base-200"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className="hidden md:flex md:flex-none md:gap-4">
          {!user.serviceProvider && (
            <Link to={"service-provider/register"}>
              <button className="relative overflow-hidden btn btn-outline btn-primary group">
                <span className="relative z-10">Become a Service Provider</span>
                <span className="absolute inset-0 w-0 transition-all duration-300 bg-primary group-hover:w-full opacity-20"></span>
              </button>
            </Link>
          )}

          <Link to={"/chats"}>
            <div className="relative">
              <button
              className="flex items-center justify-center p-3 text-white transition-all duration-300 transform rounded-full shadow-md bg-primary hover:bg-base-100 hover:shadow-lg hover:scale-105"
              aria-label="Open Chat"
              >
                <MessageCircle className="w-6 h-6" />
              </button>
            </div>
          </Link>

          {/* Notification Bell */}
          <div className="relative">
            <button
              className="flex items-center justify-center p-3 text-white transition-all duration-300 transform rounded-full shadow-md bg-primary hover:bg-base-100 hover:shadow-lg hover:scale-105"
              aria-label="Notifications"
              onClick={toggleNotifications}
            >
              <Bell className="w-6 h-6" />
              {notificationCount > 0 && (
                <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full -top-1 -right-1">
                  {notificationCount}
                </span>
              )}
            </button>
            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 z-50 mt-2 overflow-hidden transition-all duration-300 origin-top-right transform border rounded-lg shadow-xl w-80 bg-base-100 border-primary border-opacity-20">
                <div className="p-3 border-b border-base-300">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Notifications</h3>
                    {notifications.length > 0 && (
                      <button
                        onClick={clearAllNotifications}
                        className="flex items-center text-sm text-error hover:text-error-focus"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Clear all
                      </button>
                    )}
                  </div>
                </div>

                <div className="overflow-y-auto max-h-80">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="p-3 border-b border-base-200 hover:bg-base-200"
                      >
                        <div className="flex justify-between">
                          <div className="flex-1">
                            <p className="mb-1">{notification.message}</p>
                            <p className="text-xs text-base-content text-opacity-60">
                              {notification.timestamp}
                            </p>
                          </div>
                          <button
                            onClick={() => removeNotification(notification.id)}
                            className="ml-2 text-base-content text-opacity-60 hover:text-error"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-base-content text-opacity-60">
                      <p>No notifications yet</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {user.serviceProvider && (
            <button
              className="relative overflow-hidden btn btn-outline btn-secondary group"
              onClick={() => verifyServiceProvider()}
            >
              <span className="relative z-10">Go to Service Dashboard</span>
              <span className="absolute inset-0 w-0 transition-all duration-300 bg-secondary group-hover:w-full opacity-20"></span>
            </button>
          )}

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="relative transition-all duration-300 btn btn-ghost btn-circle avatar ring-2 ring-offset-2 ring-offset-base-100 ring-primary-focus ring-opacity-60 hover:ring-opacity-100"
            >
              <div className="w-12 rounded-full">
                {user.profileImage ? (
                  <img
                    alt="User profile"
                    src={user.profileImage}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <img
                    alt="Default avatar"
                    src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                    className="object-cover w-full h-full"
                  />
                )}
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-56 p-3 shadow-xl border border-primary border-opacity-20"
            >
              <li className="mb-1">
                <p
                  className="justify-between font-medium transition-colors hover:bg-primary hover:bg-opacity-10"
                  onClick={() => setEditProfile(true)}
                >
                  Profile
                </p>
              </li>
              <li className="mb-1">
                <Link to={"/booked-services/"}>
                  <a className="font-medium transition-colors hover:bg-primary hover:bg-opacity-10">
                    Your Bookings
                  </a>
                </Link>
              </li>
              <li className="mb-1">
                <p className="font-medium transition-colors hover:bg-primary hover:bg-opacity-10">
                  <ThemeChange />
                </p>
              </li>
              <div className="my-2 border-t border-base-300"></div>
              <li>
                <p
                  onClick={() => handleLogOut()}
                  className="font-medium transition-colors text-error hover:bg-error hover:bg-opacity-10"
                >
                  Logout
                </p>
              </li>
            </ul>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="absolute left-0 right-0 p-4 mt-1 border-b shadow-lg top-full bg-base-100 border-primary md:hidden">
            <div className="flex flex-col space-y-3">
              {!user.serviceProvider && (
                <Link to={"service-provider/register"}>
                  <button className="w-full btn btn-sm btn-outline btn-primary">
                    Become a Service Provider
                  </button>
                </Link>
              )}

              <Link
                to={"/chats"}
                className="flex items-center p-2 rounded-md hover:bg-base-200"
              >
                <MessageCircle className="w-5 h-5 mr-2 text-primary" />
                <span>Messages</span>
                {unreadMessages > 0 && (
                  <span className="flex items-center justify-center w-5 h-5 ml-auto text-xs font-bold text-white bg-red-500 rounded-full">
                    {unreadMessages}
                  </span>
                )}
              </Link>

              {/* Mobile Notifications */}
              <div
                className="flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-base-200"
                onClick={toggleNotifications}
              >
                <div className="flex items-center">
                  <Bell className="w-5 h-5 mr-2 text-primary" />
                  <span>Notifications</span>
                </div>
                {notificationCount > 0 && (
                  <span className="flex items-center justify-center w-5 h-5 ml-auto text-xs font-bold text-white bg-red-500 rounded-full">
                    {notificationCount}
                  </span>
                )}
              </div>

              {user.serviceProvider && (
                <button
                  className="w-full btn btn-sm btn-outline btn-secondary"
                  onClick={() => verifyServiceProvider()}
                >
                  Go to Service Dashboard
                </button>
              )}

              <Link
                to={"/booked-services/"}
                className="flex items-center p-2 rounded-md hover:bg-base-200"
              >
                <span>Your Bookings</span>
              </Link>

              <div
                className="flex items-center p-2 rounded-md cursor-pointer hover:bg-base-200"
                onClick={() => setEditProfile(true)}
              >
                <span>Profile</span>
              </div>

              <div className="flex items-center p-2 rounded-md hover:bg-base-200">
                <ThemeChange />
              </div>

              <div
                className="flex items-center p-2 rounded-md cursor-pointer text-error hover:bg-error hover:bg-opacity-10"
                onClick={handleLogOut}
              >
                <span>Logout</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="h-20"></div>

      {editProfile && (
        <UserProfileModal
          user={user}
          IsCloss={() => setEditProfile(false)}
          getUserProfile={() => getUserProfile()}
        />
      )}
    </div>
  );
};

export default Navbar;
