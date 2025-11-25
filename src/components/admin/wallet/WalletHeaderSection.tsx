import React from 'react';
import SubscriptionIcon from '../../../utils/ui/SubscriptionIcon';
import ImagePreview from '../../ui/ImagePreview';
import { IProviderWalletDetailsView } from '../../../utils/types/Iwallet';

interface Props {
  wallet: IProviderWalletDetailsView;
}

const WalletHeaderSection: React.FC<Props> = ({ wallet }) => {
  const provider = wallet.serviceProvider;

  return (
    <div className="flex flex-col gap-6 p-5 rounded-xl bg-base-100 border shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Provider Wallet Overview</h2>
        <SubscriptionIcon isSubscribedProvider={wallet.isSubscribedProvider} />
      </div>

      <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
        <ImagePreview src={provider.profileImage} className="w-24 h-24 rounded-full object-cover border" />

        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-xl font-semibold">{provider.serviceProviderName}</h3>
          <p className="text-gray-500">{provider.serviceProviderEmail}</p>
          <p className="text-gray-500">📞 {provider.serviceProviderPhone}</p>
          <p className="mt-2 text-sm text-gray-600">{provider.description}</p>
          <p className="text-sm text-gray-600">Experience: {provider.experience} yrs</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-base-200 rounded-lg">
          <h4 className="font-semibold mb-2">Bank Details</h4>
          <p>
            <b>Account Name:</b> {provider.bankDetails.accountHolderName}
          </p>
          <p>
            <b>Account No:</b> {provider.bankDetails.accountNumber}
          </p>
          <p>
            <b>IFSC:</b> {provider.bankDetails.ifscCode}
          </p>
        </div>

        <div className="p-4 bg-base-200 rounded-lg text-center">
          <p className="text-3xl font-bold text-success">₹{wallet.balance.toLocaleString()}</p>
          <p className="text-gray-500">Wallet Balance</p>

          <div className="flex justify-center gap-4 mt-2 text-sm text-gray-500">
            <span>Pending: ₹{wallet.totalPendingDebit.toLocaleString()}</span>
            <span>Success: ₹{wallet.totalSuccessDebit.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletHeaderSection;
