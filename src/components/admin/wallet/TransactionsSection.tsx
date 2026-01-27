import React from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { IWalletTransactionView } from '../../../utils/types/Iwallet';

interface Props {
  transactions: IWalletTransactionView[];
  onTransfer: (id: string, status: 'success') => void;
  onReject: (id: string) => void;
}

const TransactionsSection: React.FC<Props> = ({ transactions, onTransfer, onReject }) => {
  return (
    <div className="bg-base-100 rounded-xl border shadow-sm">
      <h3 className="text-lg font-semibold p-4 border-b">Transactions</h3>

      {/* Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
              {/* <th>Booking</th> */}
              <th>Note</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(tx => (
              <tr key={tx._id}>
                <td>{dayjs(tx.date).format('DD MMM YYYY, hh:mm A')}</td>
                <td className="capitalize">{tx.type}</td>
                <td>₹{tx.amount.toLocaleString()}</td>

                <td>
                  <span
                    className={`badge badge-sm ${
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

                {/* <td>
                  {tx.refBookingId ? (
                    <Link to={tx.refBookingId} className="link link-primary">
                      View
                    </Link>
                  ) : (
                    '-'
                  )}
                </td> */}

                <td className="max-w-[150px] truncate">{tx.note || '-'}</td>

                <td>
                  {tx.type === 'debit' && tx.status === 'pending' ? (
                    <div className="flex gap-2">
                      <button className="btn btn-xs btn-primary" onClick={() => onTransfer(tx._id, 'success')}>
                        Transfer
                      </button>

                      <button className="btn btn-xs btn-outline btn-error" onClick={() => onReject(tx._id)}>
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="md:hidden divide-y">
        {transactions.map(tx => (
          <div key={tx._id} className="p-4 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-500">{dayjs(tx.date).format('DD MMM YYYY, hh:mm A')}</p>
                <p className="text-lg font-semibold">₹{tx.amount.toLocaleString()}</p>
              </div>

              <div className="text-right">
                <p className="capitalize text-sm">{tx.type}</p>
                <span
                  className={`badge badge-sm ${
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
              </div>
            </div>

            {tx.note && <p className="text-sm text-gray-600">Note: {tx.note}</p>}

            <div className="flex justify-between items-center">
              {tx.refBookingId ? (
                <Link to={tx.refBookingId} className="link link-primary text-sm">
                  View booking
                </Link>
              ) : (
                <div />
              )}

              {tx.type === 'debit' && tx.status === 'pending' && (
                <div className="flex gap-2">
                  <button className="btn btn-xs btn-primary" onClick={() => onTransfer(tx._id, 'success')}>
                    Transfer
                  </button>

                  <button className="btn btn-xs btn-outline btn-error" onClick={() => onReject(tx._id)}>
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {transactions.length === 0 && <div className="p-6 text-center text-gray-500">No transactions found</div>}
      </div>
    </div>
  );
};

export default TransactionsSection;
