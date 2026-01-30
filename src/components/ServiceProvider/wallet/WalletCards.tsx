import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowDownToLine,
  Banknote,
  CheckCircle,
  Clock,
  Edit,
  Plus,
  TrendingDown,
  TrendingUp,
  Wallet,
  XCircle,
} from 'lucide-react';
import { HotToastError, HotToastSuccess } from '../../../utils/notificationToast';
import { postRequest } from '../../../utils/makeRequestInstance';
import { Link } from 'react-router-dom';
import { ProviderWalletProps } from '../../../utils/types/IServiceProviderWallet';

const ProviderWallet: React.FC<ProviderWalletProps> = ({ balance, transactions, bankDetails, refreshData }) => {
  const [showWithdrawSection, setShowWithdrawSection] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(balance);

  const handleWithdrawClick = () => {
    setShowWithdrawSection(prev => !prev);
  };

  const handleWithdraw = async () => {
    try {
      if (withdrawAmount == 0) {
        HotToastError('please enter amount');
        return;
      }
      const res = await postRequest('/service-providers/wallet', { amount: withdrawAmount });
      if (res.status === 200) {
        HotToastSuccess('Withdrawal request confirmed');
        if (refreshData) {
          handleWithdrawClick();
          refreshData();
        }
      }
    } catch (error) {}
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-warning" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-error" />;
      default:
        return <AlertCircle className="w-4 h-4 text-base-content/60" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-success bg-success/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      case 'failed':
        return 'text-error bg-error/10';
      default:
        return 'text-base-content/60 bg-base-200';
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="max-w-6xl p-4 mx-auto md:p-8">
        <div className=" text-center">
          <h1 className="mb-2 text-3xl font-bold text-base-content md:text-4xl">Provider Wallet</h1>
          <p className="text-base-content/70">Manage your earnings and withdrawals</p>
        </div>

        <div className="relative p-6 mb-8 overflow-hidden shadow-lg bg-base-100 rounded-3xl md:p-8">
          {/* Wrapper */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
            {/* LEFT: Balance Section */}
            <div className="relative z-10 flex-1">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Wallet className="w-8 h-8 text-primary" />
                  <h2 className="text-2xl font-bold text-base-content">Total Balance</h2>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-4xl font-bold text-primary md:text-6xl">₹{balance.toLocaleString()}</p>
              </div>

              <button
                onClick={handleWithdrawClick}
                className="flex items-center gap-2 px-6 py-3 font-semibold transition-all duration-300 shadow-lg text-primary-content bg-primary hover:shadow-xl rounded-xl hover:scale-105 active:scale-95"
              >
                <ArrowDownToLine className="w-5 h-5" />
                {showWithdrawSection ? 'Cancel Withdrawal' : 'Withdraw Funds'}
              </button>
            </div>

            {/* RIGHT: Bank Info */}
            <div
              className="
        relative z-20 w-full p-5 transition duration-300 shadow-xl 
        bg-base-200 rounded-2xl hover:shadow-2xl
        lg:absolute lg:right-6 lg:top-1/2 lg:w-72 lg:-translate-y-1/2
      "
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Banknote className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-base-content">Bank Info</h3>
                </div>

                {bankDetails ? (
                  <Link
                    to="/service-provider/myprofile"
                    title="Edit Bank Info"
                    className="p-1 rounded hover:bg-base-300"
                  >
                    <Edit className="w-4 h-4 text-primary" />
                  </Link>
                ) : (
                  <Link
                    to="/service-provider/myprofile"
                    title="Add Bank Info"
                    className="p-1 rounded hover:bg-base-300"
                  >
                    <Plus className="w-4 h-4 text-success" />
                  </Link>
                )}
              </div>

              {bankDetails ? (
                <div className="space-y-2 text-sm text-base-content">
                  <p>
                    <span className="font-medium">Holder Name:</span> {bankDetails.accountHolderName}
                  </p>
                  <p>
                    <span className="font-medium">Account No:</span> {bankDetails.accountNumber}
                  </p>
                  <p>
                    <span className="font-medium">IFSC:</span> {bankDetails.ifscCode}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-base-content">No bank info added yet.</p>
              )}
            </div>
          </div>
        </div>

        {showWithdrawSection && (
          <div className="p-8 mb-8 shadow-xl bg-base-100 rounded-3xl">
            <div className="flex items-center gap-3 mb-6">
              <ArrowDownToLine className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-bold text-base-content">Withdraw Funds</h3>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-base-content">Withdrawal Amount</label>
                <div className="relative">
                  <span className="absolute text-lg transform -translate-y-1/2 text-base-content/60 left-4 top-1/2">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={e => setWithdrawAmount(Number(e.target.value))}
                    placeholder="Enter amount"
                    className="w-full py-4 pl-8 pr-4 text-lg transition-all duration-300 border-2 border-base-300 bg-base-100 text-base-content rounded-2xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                {withdrawAmount > balance && (
                  <p className="mt-2 text-sm text-error">Amount exceeds available balance</p>
                )}
              </div>

              <div className="flex items-end">
                <button
                  className="w-full px-6 py-4 text-lg font-semibold transition-all duration-300 transform text-success-content bg-success rounded-2xl hover:bg-success/90 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:scale-105 active:scale-95"
                  onClick={handleWithdraw}
                  disabled={withdrawAmount <= 0 || withdrawAmount > balance}
                >
                  Confirm Withdrawal
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="p-8 shadow-xl bg-base-100 rounded-3xl">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-bold text-base-content">Recent Transactions</h3>
          </div>

          {transactions.length === 0 ? (
            <div className="py-12 text-center">
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-full bg-base-200">
                <Wallet className="w-8 h-8 text-base-content/40" />
              </div>
              <p className="text-lg text-base-content/60">No transactions found</p>
              <p className="text-base-content/40">Your transaction history will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {transactions.map(txn => (
                <div
                  key={txn._id}
                  className="flex items-center justify-between p-1 border border-base-300 bg-base-100 rounded-2xl "
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex items-center justify-center w-12 h-12  rounded-2xl ${txn.type == 'debit' ? 'bg-error' : 'bg-success/50'}`}
                    >
                      {txn.type == 'debit' ? (
                        <TrendingDown className="w-6 h-6 text-success-content" />
                      ) : (
                        <TrendingUp className="w-6 h-6 text-success-content" />
                      )}
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-base-content">₹{txn.amount.toLocaleString()}</p>
                      <p className="text-base-content/60">
                        {new Date(txn.date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div
                      className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(txn.status)}`}
                    >
                      {getStatusIcon(txn.status)}
                      <span className="capitalize">{txn.status}</span>
                    </div>

                    {txn.refBookingId && (
                      <Link to={`/service-provider/booked-services/${txn.refBookingId}`}>
                        <button className="px-4 py-2 transition-colors border text-primary border-primary/20 hover:bg-primary/10 rounded-xl">
                          View Details
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProviderWallet;
