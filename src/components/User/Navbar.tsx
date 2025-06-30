import { useEffect, useState } from "react";
import { getRequest } from "../../utils/makeRequestInstance";
import { apiEndPoint, apiEndPointServiceProvider } from "../../utils/constant";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  HotToastChatNotification,
  HotToastSuccess,
  HotToastSystemNotification,
} from "../../utils/notificationToast";
import { MessageCircle, Bell, Menu, X, User, LogOut, Calendar } from "lucide-react";
import { useSocketNotifications } from "../../hooks/useNotifications";
import toast from "react-hot-toast";
import {
  ISavedNotification,
  IVideoCallNotification,
} from "../../utils/types/INotification";
import Notifications from "../ui/Notifictions";
import { connectSocket } from "../../utils/socket";
import VideoCallNotification from "../../utils/ui/VideoCallNotification";
import { useFetchUserProfile } from "../../hooks/useFetchUserProfile";
import { useTheme } from "../../hooks/useTheme";

const ringtune = new Audio("/Ringtone Video call.mp3");
const notificatioRingtune = new Audio("/Ringtone Notification.mp3");

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<ISavedNotification[] | []>([]);
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const [chatNotificationCount, setChatNotificationCount] = useState<number>(0);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [videoCallNotification, setVideoCallNotification] = useState<IVideoCallNotification | null>(null);
  const [rejectFn, setRejectFn] = useState<() => void>(() => () => {});
  const [acceptFn, setAcceptFn] = useState<() => void>(() => () => {});

useTheme()


useEffect(() => {
  setChatNotificationCount(parseInt(localStorage.getItem("chatNotificationCount") || "0"));
}, []);

  const location = useLocation();
  const [pathUrl, setPathUrl] = useState(location.pathname);
  useFetchUserProfile();

  useEffect(() => {
    setPathUrl(location.pathname);
  }, [location.pathname]);

  const handleNotification = (notification: any) => {
    console.log("Received Notification:", notification);

    if (
      notification.type === "video_call" ) {
      ringtune.currentTime = 0;
      ringtune.play();

      const socket = connectSocket();
      toast.dismiss();

      const handleReject = () => {
        ringtune.currentTime = 0;
        ringtune.pause();
        socket.emit("reject_videoCall", {
          callRoomId: notification.callerId,
          user2: notification.callerId,
        });
      };

      setRejectFn(() => handleReject);

      const acceptCall = () => {
        ringtune.pause();
        ringtune.currentTime = 0;
        if (notification.user) {
          navigate("/video-call/" + notification.callerId);
        } else {
          navigate("/service-provider/video-call/" + notification.callerId);
        }
      };

      setAcceptFn(() => acceptCall);

      if (!videoCallNotification) {
        setVideoCallNotification(notification);
      }

      return;
    } else if (notification.type === "notfication") {
      notificatioRingtune.currentTime = 0;
      notificatioRingtune.play();
      toast.dismiss();

      HotToastSystemNotification(notification);
      getNotfication();
      toast.dismiss();
    } else if (notification.type === "chat") {
      console.log(pathUrl);
      
      if(pathUrl=="/chats"){
    setChatNotificationCount(0);
  localStorage.setItem("chatNotificationCount",chatNotificationCount + 0+"");
      }

if(pathUrl!=="/chats"){
      setChatNotificationCount(chatNotificationCount + 1);
  localStorage.setItem("chatNotificationCount",chatNotificationCount + 1+"");
}



      
      notificatioRingtune.currentTime = 0;
      notificatioRingtune.play();


      HotToastChatNotification(notification, () => {
        navigate("/chat/" + notification.senderId);
        setChatNotificationCount(0); 
      });
      toast.dismiss();
  
    
    }
  };

  useSocketNotifications(user._id + "", handleNotification);

  useEffect(() => {
    getNotfication();
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

  const getNotfication = async () => {
    try {
      const res = await getRequest("/notification");
      setNotifications(res.data.notifications);
      setNotificationCount(res.data.unreadedNotification);
    } catch (error) {
      console.log(error);
    }
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

  const verifyServiceProvider = async () => {
    try {
      const res = await getRequest(apiEndPointServiceProvider.verifyServiceProvider);
      if (res.status === 200) {
        HotToastSuccess("login successful");
        navigate("/service-provider/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleChatClick = () => {
    setChatNotificationCount(0); 
    navigate("/chats");
  };

  return (
    <div>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-base-100  shadow-lg border-b border-base-300" 
            : "bg-primary/5 border-b border-base-200"
        }`}
      >
        <div className="mx-auto max-w-7xl ">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold text-base-content">
                  Serv<span className="text-primary">Easy</span>
                </span>
              </Link>
            </div>



            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-4">
         {!user.serviceProvider && (
                <Link to="service-provider/register">
                  <button className="btn btn-outline btn-primary btn-sm">
                    Become a Service Provider
                  </button>
                </Link>
              )}


              {/* Chat Button with Red Dot */}
              <div className="relative">
                <button
                  onClick={handleChatClick}
                  className="btn btn-ghost btn-circle hover:bg-base-200"
                  aria-label="Open Chat"
                >
                  <MessageCircle className="w-5 h-5 text-base-content" />
                  {chatNotificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-error rounded-full min-w-[18px] h-[18px]">
                      {chatNotificationCount > 9 ? '9+' : chatNotificationCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Notification Bell */}
              <div className="relative">
                <button
                  onClick={toggleNotifications}
                  className="btn btn-ghost btn-circle hover:bg-base-200"
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5 text-base-content" />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-error rounded-full min-w-[18px] h-[18px]">
                      {notificationCount > 9 ? '9+' : notificationCount}
                    </span>
                  )}
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2">
                    <Notifications
                      countMakeitZero={() => setNotificationCount(0)}
                      localNotifications={notifications}
                      setLocalNotifications={setNotifications}
                      decrementUnreadCount={() => setNotificationCount(Math.max(0, notificationCount - 1))}
                    />
                  </div>
                )}
              </div>

              {user.serviceProvider && (
                <button
                  onClick={verifyServiceProvider}
                  className="btn btn-outline btn-secondary btn-sm"
                >
                  Go to Service Dashboard
                </button>
              )}

              {/* User Profile Dropdown */}
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                 





                    <div className="w-12 rounded-full">
                
                  <img
                    alt="User profile"
                    src={user.profileImage || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"}
                    className="object-cover w-full h-full"
                  />
              
              </div>

                </div>

                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-56 border border-base-300"
                >
                  <li>
                    <Link 
                      to="/myprofile" 
                      className="flex items-center text-base-content hover:bg-base-200"
                    >
                      <User className="w-4 h-4 mr-2" />
                      My Account
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/myprofile/booked-services/" 
                      className="flex items-center text-base-content hover:bg-base-200"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Your Bookings
                    </Link>
                  </li>
                  
                  <li className="pt-2 mt-2 border-t border-base-300">
                    <button
                      onClick={handleLogOut}
                      className="flex items-center w-full text-error hover:bg-error hover:bg-opacity-10"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="btn btn-ghost btn-square"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="border-t md:hidden border-base-300 bg-base-100">
            <div className="px-4 py-3 space-y-3">
              {!user.serviceProvider && (
                <Link to="service-provider/register">
                  <button className="w-full btn btn-outline btn-primary btn-sm">
                    Become a Service Provider
                  </button>
                </Link>
              )}

              <button
                onClick={handleChatClick}
                className="flex items-center justify-between w-full p-3 transition-colors duration-200 rounded-lg text-base-content hover:bg-base-200"
              >
                <div className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-3" />
                  Messages
                </div>
                {chatNotificationCount > 0 && (
                  <span className="text-white badge badge-error badge-sm">
                    {chatNotificationCount > 9 ? '9+' : chatNotificationCount}
                  </span>
                )}
              </button>

              <button
                onClick={toggleNotifications}
                className="flex items-center justify-between w-full p-3 transition-colors duration-200 rounded-lg text-base-content hover:bg-base-200"
              >
                <div className="flex items-center">
                  <Bell className="w-5 h-5 mr-3" />
                  Notifications
                </div>
                {notificationCount > 0 && (
                  <span className="text-white badge badge-error badge-sm">
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </span>
                )}
              </button>

              {user.serviceProvider && (
                <button
                  onClick={verifyServiceProvider}
                  className="w-full btn btn-outline btn-secondary btn-sm"
                >
                  Go to Service Dashboard
                </button>
              )}

              <Link
                to="/myprofile/booked-services/"
                className="flex items-center w-full p-3 transition-colors duration-200 rounded-lg text-base-content hover:bg-base-200"
              >
                <Calendar className="w-5 h-5 mr-3" />
                Your Bookings
              </Link>

              <Link
                to="/myprofile"
                className="flex items-center w-full p-3 transition-colors duration-200 rounded-lg text-base-content hover:bg-base-200"
              >
                <User className="w-5 h-5 mr-3" />
                Profile
              </Link>

             

              <button
                onClick={handleLogOut}
                className="flex items-center w-full p-3 transition-colors duration-200 rounded-lg text-error hover:bg-error hover:bg-opacity-10"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Video Call Notification */}
      {videoCallNotification && (
        <VideoCallNotification
          onAccept={() => acceptFn()}
          onReject={() => rejectFn()}
          videoCallNotification={videoCallNotification}
          onClose={() => setVideoCallNotification(null)}
        />
      )}

      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>
    </div>
  );
};

export default Navbar;