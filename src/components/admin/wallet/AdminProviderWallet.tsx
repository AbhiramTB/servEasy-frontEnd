import React, { useEffect, useState, useMemo } from "react";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { adminGetRequest } from "../../../utils/AxiosAdmin";
import { apiEndPointAdmin } from "../../../utils/constant";

export interface IWalletTransactionView {
  _id: string;
  type: "credit" | "debit";
  amount: number;
  status: "none" | "pending" | "success" | string;
  date: Date;
  refBookingId?: string | null;
  note?: string | null;
}

export interface IBankDetails {
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
}

export interface IServiceProviderBasicInfo {
  profileImage: string;
  serviceProviderName: string;
  serviceProviderEmail: string;
  serviceProviderPhone: string;
  description: string;
  experience: number;
  bankDetails: IBankDetails;
}

export interface IProviderWalletDetailsView {
  _id: string;
  balance: number;
  creditTransactions: IWalletTransactionView[];
  debitTransactions: IWalletTransactionView[];
  totalPendingDebit: number;
  totalSuccessDebit: number;
  serviceProvider: IServiceProviderBasicInfo;
}

const AdminProviderWallet: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [wallet, setWallet] = useState<IProviderWalletDetailsView | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (providerId: string) => {
    try {
      setLoading(true);
      const { data } = await adminGetRequest(
        apiEndPointAdmin.getWalletLists + providerId
      );
      setWallet(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchData(id);
  }, [id]);

  const allTransactions = useMemo(() => {
    if (!wallet) return [];
    return [...wallet.creditTransactions, ...wallet.debitTransactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [wallet]);

  const updateTransactionStatus = (
    txId: string,
    newStatus: "success" | "rejected"
  ) => {
    if (!wallet) return;
    setWallet((prev) =>
      prev
        ? {
            ...prev,
            debitTransactions: prev.debitTransactions.map((tx) =>
              tx._id === txId ? { ...tx, status: newStatus } : tx
            ),
          }
        : null
    );
  };

  if (loading) {
    return <div className="p-10 text-center">Loading wallet data...</div>;
  }

  if (!wallet) {
    return <div className="p-10 text-center text-error">No wallet data found.</div>;
  }

  const provider = wallet.serviceProvider;

  return (
    <div className="p-4 mx-auto space-y-8 max-w-7xl">
      <h2 className="text-3xl font-bold">Provider Wallet Overview</h2>

      {/* Provider Info Card */}
      <div className="flex flex-col gap-6 p-6 border shadow-sm rounded-xl bg-base-100 lg:flex-row">
        {/* Profile */}
        <div className="flex items-center flex-1 gap-6">
          <img
            src={provider.profileImage}
            alt="Profile"
            className="object-cover w-24 h-24 border rounded-full"
          />
          <div>
            <h3 className="text-xl font-semibold">
              {provider.serviceProviderName}
            </h3>
            <p className="text-sm text-gray-600">{provider.serviceProviderEmail}</p>
            <p className="text-sm text-gray-600">📞 {provider.serviceProviderPhone}</p>
            <p className="mt-2 text-sm text-base-content/70">
              {provider.description}
              <br />
              Experience: {provider.experience} yrs
            </p>
          </div>
        </div>

        {/* Bank Details */}
        <div className="p-4 text-sm border border-primary/5 rounded-md bg-base-200 w-full lg:w-[300px]">
          <p>
            <strong>Account Holder:</strong> {provider.bankDetails.accountHolderName}
          </p>
          <p>
            <strong>Account Number:</strong> {provider.bankDetails.accountNumber}
          </p>
          <p>
            <strong>IFSC Code:</strong> {provider.bankDetails.ifscCode}
          </p>
        </div>

        {/* Wallet Summary */}
        <div className="text-sm bg-base-200 p-4 rounded-md border border-base-300 w-full lg:w-[200px] text-center">
          <p className="text-2xl font-bold text-success">₹{wallet.balance}</p>
          <p className="text-sm text-base-content/70">Wallet Balance</p>
          <div className="mt-2 text-xs text-gray-500">
            Pending Debit: ₹{wallet.totalPendingDebit}
            <br />
            Success Debit: ₹{wallet.totalSuccessDebit}
          </div>
        </div>
      </div>

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
            {allTransactions.map((tx) => (
              <tr key={tx._id}>
                <td>{dayjs(tx.date).format("DD MMM YYYY, hh:mm A")}</td>
                <td className="capitalize">{tx.type}</td>
                <td>₹{tx.amount}</td>
                <td>
                  <span
                    className={`badge ${
                      tx.status === "success"
                        ? "badge-success"
                        : tx.status === "pending"
                        ? "badge-warning"
                        : tx.status === "rejected"
                        ? "badge-error"
                        : "badge-ghost"
                    }`}
                  >
                    {tx.status}
                  </span>
                </td>
                <td>{tx.refBookingId || "-"}</td>
                <td>{tx.note || "-"}</td>
                <td>
                  {tx.type === "debit" && tx.status === "pending" && (
                    <div className="flex gap-2">
                      <button
                        className="btn btn-xs btn-primary"
                        onClick={() =>
                          updateTransactionStatus(tx._id, "success")
                        }
                      >
                        Transfer Money
                      </button>
                      <button
                        className="btn btn-xs btn-outline btn-error"
                        onClick={() =>
                          updateTransactionStatus(tx._id, "rejected")
                        }
                      >
                        Reject
                      </button>
                    </div>
                  )}
                  {(tx.type === "credit" || tx.status !== "pending") && (
                    <span className="text-xs text-gray-400">-</span>
                  )}
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
