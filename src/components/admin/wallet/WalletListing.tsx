import { useEffect, useState } from 'react';

import { adminGetRequest } from '../../../utils/AxiosAdmin';
import { apiEndPointAdmin } from '../../../utils/constant';
import Pagination from '../../ui/Pagination';
import { UserCardSkeleton } from '../../../Skeleton/admin/UserCardSkeleton';

import WalletCard from './WalletCard';

const WalletListing = () => {
  interface IProviderWalletListing {
    _id: string;
    profileImage: string;
    serviceProviderName: string;
    serviceProviderEmail: string;
    serviceProviderPhone: String;
    description: string;
    experience: string;
    isSubscribedProvider: boolean;
    wallet: { balance: number; pending: boolean };
  }

  const fetchWallet = async (page: number) => {
    try {
      const params: Record<string, any> = {
        page,
        limit: dataLimit,
      };

      const res = await adminGetRequest(apiEndPointAdmin.getWalletLists, { params });
      if (res.status == 200) {
        setWallet(res.data.data);
        setTotalData(res.data.data.length);
        setPage(page);
      }
    } catch (error) {
      console.error('Error fetching wallet data:', error);
    }
  };

  const dataLimit = 6;

  useEffect(() => {
    fetchWallet(0);
  }, []);

  const [providerWalletListings, setWallet] = useState<IProviderWalletListing[] | []>([]);
  const [crrPage, setPage] = useState<number>(0);
  const [totalData, setTotalData] = useState<number>(0);

  return (
    <div className="min-h-screen ">
      <div className="p-6 border-b border-base-300/50">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-2 text-3xl font-bold text-base-content">Service Provider Wallets</h1>
        </div>
      </div>
      <div className="p-6 mx-auto max-w-7xl">
        {providerWalletListings.length ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {providerWalletListings.map((providerData: IProviderWalletListing) => (
              <WalletCard data={providerData} key={providerData._id} />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap ">
            {Array(dataLimit)
              .fill(0)
              .map((d, i) => (
                <UserCardSkeleton key={d + i} h={'h-96'} w={'w-1/4'} />
              ))}
          </div>
        )}

        <div className="mt-12">
          <Pagination
            crrPage={crrPage}
            dataLimit={dataLimit}
            totaldata={totalData}
            fetchData={(p: number) => fetchWallet(p)}
          />
        </div>
      </div>
    </div>
  );
};

export default WalletListing;
