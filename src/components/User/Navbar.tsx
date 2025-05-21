
import { useEffect, useState } from "react";
import ThemeChange from "../ThemeChange";
import { getRequest } from "../../utils/makeRequestInstance";
import { apiEndPoint, apiEndPointServiceProvider } from "../../utils/constant";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Link, useNavigate, useLocation } from "react-router-dom";
import UserProfileModal from "./UpdateProfile";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/slices/userSlice";
import {
  HotToastChatNotification,
  HotToastSuccess,
  HotToastSystemNotification,
  
} from "../../utils/notificationToast";
import {
  MessageCircle,
  Bell,
  Menu,
  X,

} from "lucide-react";
import { useSocketNotifications } from "../../hooks/useNotifications";
import toast from "react-hot-toast";
import {
  ISavedNotification,
  IVideoCallNotification,
} from "../../utils/types/INotification";
import Notifications from "../ui/Notifictions";
import { connectSocket } from "../../utils/socket";
import VideoCallNotification from "../../utils/ui/VideoCallNotification";

const ringtune = new Audio("/Ringtone Video call.mp3");
const notificatioRingtune = new Audio("/Ringtone Notification.mp3");

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  const [editProfile, setEditProfile] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<ISavedNotification[] | []>(
    []
  );
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [videoCallNotification, setVideoCallNotification] = useState<IVideoCallNotification | null>(null);
  const [rejectFn, setRejectFn] = useState<() => void>(() => () => {});
  const handleNotification = (notification: any) => {
    console.log("Received Notification:", notification);
  
    if (notification.type === "video_call") {
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
      if(!videoCallNotification){
      setVideoCallNotification(notification);

      }

      // HotToastVideoCall(notification, () => {}, handleReject);

      return;
    } else if (notification.type === "notfication") {
      notificatioRingtune.currentTime = 0;
      notificatioRingtune.play();
      toast.dismiss();

      HotToastSystemNotification(notification);
      getNotfication();
      toast.dismiss();
    } else if (notification.type === "chat") {
      notificatioRingtune.currentTime = 0;
      notificatioRingtune.play();
      
      HotToastChatNotification(notification, () => {
        navigate("/chat/" + notification.senderId);
      });
      toast.dismiss();

      getNotfication();
    }
  };

  useSocketNotifications(user._id + "", handleNotification);

  useEffect(() => {
    getUserProfile();
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
      console.log();

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

  const getUserProfile = async () => {
    try {
      const res = await getRequest(apiEndPoint.getUserProfile);
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

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div>
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-base-100 bg-opacity-95 shadow-lg backdrop-blur-sm" : "bg-base-100"} border-b navbar border-primary`}
      >
        <div className="flex-1">
          <p className="font-serif text-2xl font-bold tracking-tight btn btn-ghost text-primary hover:text-primary-focus">
            <Link to={"/"} className="flex items-center">
              <span className="relative">
                Serv<span className="text-secondary">Easy</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all group-hover:w-full"></span>
              </span>
            </Link>
          </p>
        </div>


{videoCallNotification && (

     <VideoCallNotification
      onAccept={() => {}}
      onReject={() => rejectFn()}
      videoCallNotification={videoCallNotification}
      onClose={() => setVideoCallNotification(null)}
    />
 
)}
       

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
              <Notifications
                notifications={notifications}
                decrementUnreadCount={() =>
                  setNotificationCount(notificationCount - 1)
                }
              />
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
