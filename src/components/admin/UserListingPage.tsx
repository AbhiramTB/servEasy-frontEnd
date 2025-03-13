import React, { useEffect, useCallback, useState,  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUsers } from "../../redux/slices/adminSlice";
import { adminGetRequest, adminPatchRequest } from "../../utils/AxiosAdmin";
import { apiEndPointAdmin } from "../../utils/constant";
import { RootState } from "../../redux/store";
import UserProfileView from "./showProfile";
import { HotToastSuccess } from "../../utils/HotToasitify";
import { Toaster } from "react-hot-toast";

const UserListingPage: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const getAllUser = useCallback(async () => {
    try {
      const res = await adminGetRequest(apiEndPointAdmin.getAllUsers);
      if (res.data && res.data.data) {
        dispatch(addUsers(res.data.data));
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    getAllUser();
  }, [getAllUser]);

  const users = useSelector((state: RootState) => state.admin.users);
  
  const handleBlockUser =  async(userId: string,action:string) => {
    console.log(`Blocking user with ID: ${userId} ${action}`);
    const data={userId:userId,action:action}
     const res  = await  adminPatchRequest(apiEndPointAdmin.blockUnblockUser,data)
      HotToastSuccess(action+"user successfuly")
     dispatch(addUsers(res.data.data));     

  };

  const handleViewProfile = (userId: string) => {
    setSelectedUserId(userId);
  };

  const handleCloseProfile = () => {
    setSelectedUserId(null);
  };

//   const handleToggleAdminPriority = (userId: string) => {
//     // Find user in the state
//     const user = users.find(u => u._id === userId);
    
//     if (user) {
//       const newPriorityStatus = !user.isAdmin;
//       console.log(`Setting priority for user ${userId} to ${newPriorityStatus}`);
       
     
//     }
//   };

  const selectedUser = users.find(user => user._id === selectedUserId);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
        <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Users</h1>
            <p className="mt-1 text-gray-400">Manage user accounts here.</p>
          </div>
        </div>

        {selectedUser && <UserProfileView user={selectedUser} onClose={handleCloseProfile} />}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="text-gray-400 text-lg">Loading users...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
            {users.length > 0 ? (
              users.map((user) => (
                <div key={user._id} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden shadow-md">
                  <div className="p-5">
                    <div className="flex items-center mb-4">
                      <div className="h-12 w-12 rounded-full flex items-center justify-center bg-blue-600">
                        <span className="font-medium text-lg text-white">
                          {user.userName?.substring(0, 2) || "NA"}
                        </span>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-white">{user.userName || "Unknown"}</h3>
                        <div className="flex flex-wrap gap-1 mt-1">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.isVerified ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"
                          }`}>
                            {user.isVerified ? "Verified" : "Unverified"}
                          </span>
                          {user.isAdmin===true && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-900/30 text-yellow-400">
                              admin
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm text-gray-300">
                      <p>Email: {user.email}</p>
                      <p>Phone: {user.phone}</p>
                    </div>
                  </div>
                  <div className="flex border-t border-gray-700">
                    <button 
                      onClick={() => handleViewProfile(user._id)}
                      className="flex-1 py-3 text-gray-300 hover:bg-gray-700 text-sm font-medium"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => handleBlockUser(user._id,user.isBlocked ? "Unblock" : "Block")}
                      className="flex-1 py-3 text-red-400 hover:bg-gray-700 text-sm font-medium flex items-center justify-center"
                    >
                      {user.isBlocked ? "Unblock" : "Block"}
                    </button>
                  </div>
                  <div className="flex border-t border-gray-700">
                    {/* <button
                      onClick={() => handleToggleAdminPriority(user._id)}
                      className={`flex-1 py-3 text-sm font-medium flex items-center justify-center ${
                        user.isAdmin 
                          ? "text-yellow-400 hover:bg-yellow-900/20" 
                          : "text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 mr-2" 
                        fill={user.isAdmin ? "currentColor" : "none"} 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" 
                        />
                      </svg>
                      {user.isAdmin ? "Remove Priority" : "Set as Priority"}
                    </button> */}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center col-span-full">No users found.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default UserListingPage;