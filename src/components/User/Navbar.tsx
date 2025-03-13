import { ChangeEvent, useState } from "react";
import ThemeChange from "./ThemeChange";
import { postRequest } from "../../utils/makeRequestInstance";
import { apiEndPoint } from "../../utils/constant";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Link } from "react-router-dom";

const Navbar = () => {
  const profilePlaceHolder =
    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [ProfileImg, setProfileImg] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.user);

  const updateProfile = async () => {
    const data = { ProfileImg: ProfileImg };
    await postRequest(apiEndPoint.getUserProfile, data);
  };

  const toggleUploadCard = () => {
    setIsUploadOpen(!isUploadOpen);
  };
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setProfileImg(result); // Save Base64 string to state
      };
      reader.readAsDataURL(file); // Convert image to Base64
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
          <ThemeChange />
          {!user.serviceProvider && (
            <Link to={"service-provider/register"}>
              <button className="hidden btn btn-outline btn-primary md:inline-block">
                Become a Service Provider
              </button>{" "}
            </Link>
          )}

          {user.serviceProvider && (
            <Link to={"/service-provider/dashboard"}>
              {" "}
              <button className="hidden btn btn-outline btn-secondary md:inline-block">
                Go to Service Dashboard
              </button>{" "}
            </Link>
          )}

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={ProfileImg || user.profileImage || profilePlaceHolder}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
            >
              <li onClick={toggleUploadCard}>
                <a className="justify-between">
                  Profile
                  <span className="badge badge-primary">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
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

      {isUploadOpen && (
        <div className="absolute z-50 mt-2 border rounded-lg shadow-lg right-4 w-80 bg-base-100 border-primary">
          <div className="p-4">
            <h2 className="mb-2 text-lg font-semibold text-primary">
              Upload Profile Image
            </h2>
            <form className="space-y-4">
              <div className="form-control">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full file-input file-input-bordered"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={updateProfile}
                  className="btn btn-primary btn-sm"
                >
                  Upload
                </button>
                <button
                  type="button"
                  className="btn btn-outline btn-secondary btn-sm"
                  onClick={toggleUploadCard}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
