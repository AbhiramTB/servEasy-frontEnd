import { useEffect, useState } from 'react';
import {  Link } from 'react-router-dom';
import { ROUTES } from '../../../utils/constants/routes';
import { adminGetRequest } from '../../../utils/AxiosAdmin';
import { apiEndPointAdmin } from '../../../utils/constant';
import Pagination from '../../ui/Pagination';
import { UserCardSkeleton } from '../../../Skeleton/admin/UserCardSkeleton';

const WalletListing = () => {
  interface IProviderWalletListing {
    _id: string;
    profileImage: string;
    serviceProviderName: string;
    serviceProviderEmail: string;
    serviceProviderPhone: String;
    description: string;
    experience: string;
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
    <div className="min-h-screen ">      <div className="p-6 border-b border-base-300/50">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-2 text-3xl font-bold text-base-content">
            Service Provider Wallets
          </h1>
        
        </div>
      </div>

      <div className="p-6 mx-auto max-w-7xl">
        {providerWalletListings.length ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {providerWalletListings.map((providerData: IProviderWalletListing) => (
              <Link
                key={providerData._id}
                to={ROUTES.ADMIN.SERVICE_PROVIDER_WALLET_DETAIL(providerData._id)}
                className="block group"
              >
                <div className="relative overflow-hidden transition-all border shadow-lg bg-base-200 hover:border-primary/30">
                  {providerData.wallet.pending && (
                    <div className="absolute z-10 top-4 right-4">
                      <div className="tooltip tooltip-left" data-tip="Payment withdrawal requested">
                        <div className="relative">
                          <span className="flex w-3 h-3">
                            <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-warning"></span>
                            <span className="relative inline-flex w-3 h-3 rounded-full bg-error"></span>
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="flex-shrink-0 avatar">
                        <div className="w-16 h-16 transition-all duration-300 rounded-full ring-2 ring-primary/20 group-hover:ring-primary/40">
                          <img 
                            src={providerData.profileImage} 
                            alt={providerData.serviceProviderName}
                            className="object-cover"
                          />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="mb-1 text-lg font-semibold truncate transition-colors text-base-content group-hover:text-primary">
                          {providerData.serviceProviderName}
                        </h3>
                        <p className="text-sm truncate text-base-content/60">
                          {providerData.serviceProviderEmail}
                        </p>
                        <div className="flex items-center gap-1 mt-2">
                          <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-info/10 text-info">
                            {providerData.experience} yrs exp
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-sm leading-relaxed text-base-content/70 line-clamp-3">
                        {providerData.description}
                      </p>
                    </div>

                    <div className="relative">
                      <div className="p-4 border bg-gradient-to-r from-success/10 to-success/5 rounded-xl border-success/20">
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs font-medium tracking-wide uppercase text-success">
                              Wallet Balance
                            </span>
                          </div>
                          <p className="text-2xl font-bold text-success">
                            ₹{providerData.wallet.balance.toLocaleString('en-IN')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none bg-gradient-to-t from-primary/5 to-transparent group-hover:opacity-100" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap ">
                     {Array(dataLimit)
                       .fill(0)
                       .map((d, i) => (
                         <UserCardSkeleton key={d + i} h={"h-96"} w={"w-1/4"} />
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