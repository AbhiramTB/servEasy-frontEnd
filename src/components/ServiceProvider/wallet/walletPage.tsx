import LoadingSpinner from '../../ui/LoadingSpinner';
import ProviderWallet from './WalletCards';
import Pagination from '../../ui/Pagination';
import { useEffect, useState } from 'react';
import { getRequest } from '../../../utils/makeRequestInstance';
import { ProviderWalletProps } from '../../../utils/types/IServiceProviderWallet';
import EmptyState from '../../ui/EmptyState';

const Walletpage = () => {
  const [crrPage, setPage] = useState<number>(0);
  const [totalData, setTotalData] = useState<number>(0);
  const [wallet, setWallet] = useState<ProviderWalletProps | null>(null);
  const dataLimit = 5;

  useEffect(() => {
    getData(crrPage);
  }, [crrPage]);

  async function getData(page: number) {
    try {
      const params: Record<string, any> = {};
      params.limit = dataLimit;
      params.skip = page;

      const res = await getRequest('/service-providers/wallet', params);
      setWallet(res.data.data);
      setTotalData(res.data.count);

      setPage(page || 0);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      {!wallet && (
        <div>
          {' '}
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold text-base-content md:text-4xl">Provider Wallet</h1>
            <p className="text-base-content/70">Manage your earnings and withdrawals</p>
          </div>{' '}
          <EmptyState
            icon="system-error"
            message="Once you receive a service payment, your wallet will appear here."
            title="Wallet not found"
          />{' '}
        </div>
      )}

      {wallet && (
        <div>
          <ProviderWallet
            balance={wallet.balance}
            transactions={wallet.transactions}
            serviceProviderId={wallet.serviceProviderId}
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
