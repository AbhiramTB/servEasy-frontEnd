import ProviderWallet from './WalletCards';
import Pagination from '../../ui/Pagination';
import { useEffect, useState } from 'react';
import { getRequest } from '../../../utils/makeRequestInstance';
import { ProviderWalletProps } from '../../../utils/types/IServiceProviderWallet';
import EmptyState from '../../ui/EmptyState';
import WalletShimmer from '../../../Skeleton/Pages/WalletShimmer';

const Walletpage = () => {
  const [crrPage, setPage] = useState<number>(0);
  const [totalData, setTotalData] = useState<number>(0);
  const [wallet, setWallet] = useState<ProviderWalletProps | null>(null);
  const [loading, setLoading] = useState(false);
  const dataLimit = 5;

  useEffect(() => {
    getData(crrPage);
  }, [crrPage]);

  async function getData(page: number) {
    try {
      setLoading(true);
      const params: Record<string, any> = {};
      params.limit = dataLimit;
      params.skip = page;

      const res = await getRequest('/service-providers/wallet', params);
      console.log(res.data.data);
      setWallet(res.data.data.wallet);
      setTotalData(res.data.data.count);
      console.log(wallet);
      setPage(page || 0);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  console.log(wallet);
  return (
    <div>
      {loading && <WalletShimmer />}

      {!wallet && !loading && (
        <div>
          {' '}
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold text-base-content md:text-4xl">Provider Wallet</h1>
            <p className="text-base-content/70">Manage your earnings and withdrawals</p>
          </div>{' '}
          <EmptyState
            icon="no-data"
            message="Once you receive a service payment, your wallet will appear here."
            title="Wallet not found"
          />{' '}
        </div>
      )}

      {wallet && (
        <div>
          <ProviderWallet
            balance={wallet.balance || 0}
            transactions={wallet.transactions || []}
            serviceProviderId={wallet.serviceProviderId || 'dfdf'}
            bankDetails={wallet.bankDetails}
            refreshData={() => getData(crrPage)}
          />
          <Pagination
            crrPage={crrPage}
            dataLimit={dataLimit}
            totaldata={totalData}
            fetchData={(p: number) => getData(p)}
          />{' '}
        </div>
      )}
    </div>
  );
};

export default Walletpage;
