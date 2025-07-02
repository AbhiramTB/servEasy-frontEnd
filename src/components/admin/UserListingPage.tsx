import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUsers } from '../../redux/slices/adminSlice';
import { adminGetRequest, adminPatchRequest } from '../../utils/AxiosAdmin';
import { apiEndPointAdmin } from '../../utils/constant';
import { RootState } from '../../redux/store';
import UserProfileView from './showProfile';
import { HotToastSuccess } from '../../utils/notificationToast';
import { Toaster } from 'react-hot-toast';
import Pagination from '../../utils/ui/pagination';
import SearchComponent from '../ui/SearchComponent';

const UserListingPage: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [crrPage, setPage] = useState<number>(0);
  const [totalData, setTotalData] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const dataLimit = 8;
  const getAllUser = useCallback(
    async (page: number, searchQuery?: string) => {
      try {
        const params: Record<string, any> = {
          page,
          limit: dataLimit,
        };

        if (searchQuery) {
          params.search = searchQuery;
        }

        const res = await adminGetRequest(apiEndPointAdmin.getAllUsers, { params });
        if (res.status) {
          dispatch(addUsers(res.data.users));
          setTotalData(res.data.count);
          setPage(page);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    },
    [dispatch,dataLimit]
  );

  useEffect(() => {
    getAllUser(crrPage);
  }, [getAllUser]);

  useEffect(() => {
    getAllUser(0,searchQuery);
  }, [searchQuery]);

  const users = useSelector((state: RootState) => state.admin.users);

  const handleBlockUser = async (userId: string, action: string) => {
    console.log(`Blocking user with ID: ${userId} ${action}`);
    const data = { userId: userId, action: action };
    const res = await adminPatchRequest(apiEndPointAdmin.blockUnblockUser, data);
    HotToastSuccess(action + 'user successfuly');
    dispatch(addUsers(res.data.data));
  };

  const handleViewProfile = (userId: string) => {
    setSelectedUserId(userId);
  };

  const handleCloseProfile = () => {
    setSelectedUserId(null);
  };

  const selectedUser = users.find(user => user._id === selectedUserId);

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <Toaster position="top-center" reverseOrder={false} />

      <main className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col mb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Users</h1>
            <p className="mt-1 text-base-content/70">Manage user accounts here.</p>
          </div>

          <div className="flex justify-end mt-3">
            <SearchComponent setSearch={setSearchQuery}  searchVal={searchQuery}/>
          </div>
        </div>

        {selectedUser && <UserProfileView user={selectedUser} onClose={handleCloseProfile} />}

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <span className="text-lg text-base-content/70">Loading users...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {users.length > 0 ? (
              users.map(user => (
                <div key={user._id} className="overflow-hidden border rounded-lg shadow-md bg-base-200 border-base-300">
                  <div className="p-5">
                    <div className="flex items-center mb-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary">
                        <span className="text-lg font-medium text-primary-content">
                          {user.userName?.substring(0, 2) || 'NA'}
                        </span>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold">{user.userName || 'Unknown'}</h3>
                        <div className="flex flex-wrap gap-1 mt-1">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              user.isVerified ? 'bg-success/20 text-success' : 'bg-error/20 text-error'
                            }`}
                          >
                            {user.isVerified ? 'Verified' : 'Unverified'}
                          </span>
                          {user.isAdmin === true && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning/20 text-warning">
                              admin
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm text-base-content/80">
                      <p>Email: {user.email}</p>
                      <p>Phone: {user.phone}</p>
                    </div>
                  </div>
                  <div className="flex border-t border-base-300">
                    <button
                      onClick={() => handleViewProfile(user._id)}
                      className="flex-1 py-3 text-sm font-medium hover:bg-base-300"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => handleBlockUser(user._id, user.isBlocked ? 'Unblock' : 'Block')}
                      className="flex items-center justify-center flex-1 py-3 text-sm font-medium text-error hover:bg-base-300"
                    >
                      {user.isBlocked ? 'Unblock' : 'Block'}
                    </button>
                  </div>
                  <div className="flex border-t border-base-300"></div>
                </div>
              ))
            ) : (
              <p className="text-center text-base-content/70 col-span-full">No users found.</p>
            )}
          </div>
        )}
      </main>

      <Pagination
        crrPage={crrPage}
        dataLimit={dataLimit}
        totaldata={totalData}
        fetchData={(p: number) => getAllUser(p,searchQuery)}
      />
    </div>
  );
};

export default UserListingPage;
