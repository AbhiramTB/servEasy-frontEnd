
import LoadingSpinner from '../../ui/LoadingSpinner';
import ProviderWallet from './WalletCards';
import Pagination from '../../ui/Pagination';
import { useEffect, useState } from 'react';
import { getRequest } from '../../../utils/makeRequestInstance';
import { ProviderWalletProps } from '../../../utils/types/IServiceProviderWallet';

const Walletpage = () => {
  const [crrPage, setPage] = useState<number>(0);
  const [totalData, setTotalData] = useState<number>(0);
  const dataLimit = 5;

  useEffect(() => {
    getData(crrPage);
  }, [crrPage]);

  async function getData(page: number) {
    const params: Record<string, any> = {};
    params.limit = dataLimit;
    params.skip = page;

    const res = await getRequest('/service-providers/wallet', params);
    setWallet(res.data.data);
    setTotalData(res.data.count);





     
    setPage(page || 0);
  }
  const [wallet, setWallet] = useState<ProviderWalletProps | null>(null);

  return (
    <div>
      {/* <button className="p-4 bg-primary" onClick={getData}>
        CLICK ME TO GET DATA
      </button> */}
      {!wallet && <LoadingSpinner backGoundColor="bg-base-300" />}

      {wallet && (
        <div>
          {' '}
          <ProviderWallet
            balance={wallet.balance}
            transactions={wallet.transactions}
            serviceProviderId={wallet.serviceProviderId}
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
