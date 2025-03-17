import { useEffect, useState } from "react";
import ThemeChange from "./ThemeChange";
import { getRequest } from "../../utils/makeRequestInstance";
import { apiEndPoint, apiEndPointServiceProvider } from "../../utils/constant";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Link, useNavigate } from "react-router-dom";
import UserProfileModal from "./UpdateProfile";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/slices/userSlice";
import { HotToastSuccess } from "../../utils/HotToasitify";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  const [editProfile, setEditProfile] = useState<boolean>(false);
  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = async () => {
    try {
      const res: any = await getRequest(apiEndPoint.getUserProfile);
      console.log(res.data.user);

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
      console.log(res);
      if (res.status === 200) {
        HotToastSuccess("verification successful");
        navigate("/service-provider/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="border-b shadow-md navbar bg-base-100 border-primary">
        <div className="flex-1">
          <a className="font-serif text-2xl btn btn-ghost text-primary">
            ServEasy
          </a>
        </div>
        <div className="flex-none gap-4">
          {!user.serviceProvider && (
            <Link to={"service-provider/register"}>
              <button className="hidden btn btn-outline btn-primary md:inline-block">
                Become a Service Provider
              </button>{" "}
            </Link>
          )}

          {user.serviceProvider && (
            <button
              className="hidden btn btn-outline btn-secondary md:inline-block"
              onClick={() => verifyServiceProvider()}
            >
              Go to Service Dashboard
            </button>
          )}

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="rounded-full w-14">
                {user.profileImage && (
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.profileImage}
                  />
                )}

                {!user.profileImage && (
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                  />
                )}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
            >
              <li>
                <a
                  className="justify-between"
                  onClick={() => setEditProfile(true)}
                >
                  Profile
                  {/* <span className="badge badge-primary">New</span> */}
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
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
      </div>

      {editProfile && (
        <UserProfileModal
          user={user}
          IsCloss={() => setEditProfile(false)}
          getUserProfile={() => getUserProfile()}
        />
        // <div className="absolute z-50 mt-2 border rounded-lg shadow-lg right-4 w-80 bg-base-100 border-primary">
        //   <div className="p-4">
        //     <h2 className="mb-2 text-lg font-semibold text-primary">
        //       Upload Profile Image
        //     </h2>
        //     <form className="space-y-4">
        //       <div className="form-control">
        //         <input
        //           type="file"
        //           accept="image/*"
        //           onChange={handleImageUpload}
        //           className="w-full file-input file-input-bordered"
        //         />
        //       </div>
        //       <div className="flex justify-end gap-2">
        //         <button
        //           type="button"
        //           onClick={updateProfile}
        //           className="btn btn-primary btn-sm"
        //         >
        //           Upload
        //         </button>
        //         <button
        //           type="button"
        //           className="btn btn-outline btn-secondary btn-sm"
        //           onClick={toggleUploadCard}
        //         >
        //           Cancel
        //         </button>
        //       </div>
        //     </form>
        //   </div>
        // </div>
      )}
    </div>
  );
};

export default Navbar;
