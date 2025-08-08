import React, { useState } from 'react';
import dayjs from 'dayjs';

interface WalletTransaction {
  _id: string;
  type: 'credit' | 'debit';
  amount: number;
  status: 'none' | 'pending' | 'success' | 'rejected';
  refBookingId?: string | null;
  note?: string | null;
  date: string;
}

interface ProviderWallet {
  serviceProviderId: string;
  balance: number;
  transactions: WalletTransaction[];
}

interface ServiceProvider {
  _id: string;
  serviceProviderName: string;
  serviceProviderEmail: string;
  serviceProviderPhone: string;
  description: string;
  experience: number;
  profileImage?: string;
  isVerified: string;
  isBlocked: boolean;
  bankDetails: {
    accountHolderName: string;
    accountNumber: string;
    ifscCode: string;
  };
}

const dummyWallet: ProviderWallet = {
  serviceProviderId: '6815740da1555397b78b5a32',
  balance: 5000,
  transactions: [
    {
      _id: '1',
      type: 'credit',
      amount: 9000,
      status: 'none',
      date: '2025-07-20T14:00:15.905+00:00',
      refBookingId: 'BOOK123',
    },
    {
      _id: '2',
      type: 'debit',
      amount: 4000,
      status: 'pending',
      date: '2025-07-21T14:28:11.386+00:00',
    },
    {
      _id: '3',
      type: 'debit',
      amount: 1500,
      status: 'success',
      date: '2025-07-22T14:28:11.386+00:00',
    },
  ],
};

const providerData: ServiceProvider = {
  _id: '6842b93c7b8517522821206d',
  serviceProviderName: 'testServiceprovider',
  serviceProviderEmail: 'testserviceprovider@gmail.com',
  serviceProviderPhone: '8590876697',
  description: 'test service prvovider',
  experience: 4,
  profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqhev_LZtgfsrWs1ZgxhI1_Nv79WvFc5yH3g&s',
  isVerified: 'verified',
  isBlocked: false,
  bankDetails: {
    accountHolderName: 'RazorpayTest',
    accountNumber: '1121431121541121',
    ifscCode: 'HDFC0001233',
  },
};

const AdminProviderWallet: React.FC = () => {
  const [wallet, setWallet] = useState<ProviderWallet>(dummyWallet);

  const updateTransactionStatus = (id: string, newStatus: 'success' | 'rejected') => {
    setWallet(prev => ({
      ...prev,
      transactions: prev.transactions.map(tx => (tx._id === id ? { ...tx, status: newStatus } : tx)),
    }));
  };

  return (
    <div className="max-w-6xl p-4 mx-auto">
      <h2 className="mb-6 text-3xl font-bold">Provider Wallet Overview</h2>

      {/* Provider Info */}
      <div className="flex flex-col gap-6 p-6 mb-6 border shadow-sm rounded-xl bg-base-100 lg:flex-row lg:items-start">
  {/* Profile Section */}
  <div className="flex items-center flex-1 gap-6">
    <img
      src={providerData.profileImage}
      alt="Profile"
      className="object-cover w-24 h-24 border rounded-full"
    />
    <div>
      <h3 className="text-xl font-semibold">{providerData.serviceProviderName}</h3>
      <p className="text-sm text-gray-600">{providerData.serviceProviderEmail}</p>
      <p className="text-sm text-gray-600">📞 {providerData.serviceProviderPhone}</p>
      <p className="mt-2 text-sm text-base-content/70">
        {providerData.description}
        <br />
        Experience: {providerData.experience} yrs |{" "}
        <span className="capitalize">{providerData.isVerified}</span>
      </p>
    </div>
  </div>

  {/* Bank Details */}
  <div className="text-sm border border-primary/5 p-4 rounded-md bg-base-200 text-base-content/70 w-full lg:w-[300px]">
    <p><strong>Account Holder:</strong> {providerData.bankDetails.accountHolderName}</p>
    <p><strong>Account Number:</strong> {providerData.bankDetails.accountNumber}</p>
    <p><strong>IFSC Code:</strong> {providerData.bankDetails.ifscCode}</p>
  </div>

  {/* Wallet Balance */}
  <div className="text-sm bg-base-200 p-4 rounded-md border border-base-300 w-full lg:w-[200px] text-center">
    <p className="mb-1 text-base-content/70">Provider ID:</p>
    <p className="mb-3 font-mono text-xs">{wallet.serviceProviderId}</p>
    <p className="text-2xl font-bold text-success">₹{wallet.balance}</p>
    <p className="text-sm text-base-content/70">Wallet Balance</p>
  </div>
</div>


      {/* Wallet Summary */}
      

      {/* Transactions Table */}
      <div className="overflow-x-auto border shadow-sm rounded-xl bg-base-100 border-base-300">
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Booking Ref</th>
              <th>Note</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {wallet.transactions.map(tx => (
              <tr key={tx._id}>
                <td>{dayjs(tx.date).format('DD MMM YYYY, hh:mm A')}</td>
                <td className="capitalize">{tx.type}</td>
                <td>₹{tx.amount}</td>
                <td>
                  <span
                    className={`badge ${
                      tx.status === 'success'
                        ? 'badge-success'
                        : tx.status === 'pending'
                          ? 'badge-warning'
                          : tx.status === 'rejected'
                            ? 'badge-error'
                            : 'badge-ghost'
                    }`}
                  >
                    {tx.status}
                  </span>
                </td>
                <td>{tx.refBookingId || '-'}</td>
                <td>{tx.note || '-'}</td>
                <td>
                  {tx.type === 'debit' && tx.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        className="btn btn-xs btn-primary"
                        onClick={() => updateTransactionStatus(tx._id, 'success')}
                      >
                        Transfer Money
                      </button>
                      <button
                        className="btn btn-xs btn-outline btn-error"
                        onClick={() => updateTransactionStatus(tx._id, 'rejected')}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                  {tx.type === 'credit' || tx.status !== 'pending' ? (
                    <span className="text-xs text-gray-400">-</span>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProviderWallet;
