import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { adminGetRequest, adminPatchRequest } from '../../../utils/AxiosAdmin';
import { apiEndPointAdmin } from '../../../utils/constant';
import { HotToastSuccess } from '../../../utils/notificationToast';
import RejectionReasonModal from './RejectionReasonModal';
import { IProviderWalletDetailsView } from '../../../utils/types/Iwallet';
import TransactionsSection from './TransactionsSection';
import WalletHeaderSection from './WalletHeaderSection';

const AdminProviderWallet: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [wallet, setWallet] = useState<IProviderWalletDetailsView | null>(null);
  const [loading, setLoading] = useState(false);
  const [transactionId, setTransactionId] = useState<string | null>(null);

  // Fetch wallet
  const fetchWallet = async (providerId: string) => {
    try {
      setLoading(true);

      const { data } = await adminGetRequest(apiEndPointAdmin.getWalletLists + providerId);

      setWallet(data);
    } catch (err) {
      console.error('Wallet fetch failed', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchWallet(id);
  }, [id]);

  // Merge + sort transactions
  const transactions = useMemo(() => {
    if (!wallet) return [];

    return [...wallet.creditTransactions, ...wallet.debitTransactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [wallet]);

  // Update transaction status
  const updateTransactionStatus = async (txId: string, newStatus: 'success' | 'rejected', reason?: string) => {
    if (!id) return;

    const res = await adminPatchRequest(apiEndPointAdmin.getWalletLists + id, {
      transactionId: txId,
      newStatus,
      ...(reason ? { reason } : {}),
    });

    if (res.status === 200) {
      HotToastSuccess(`Transaction ${newStatus}`);

      setWallet(prev =>
        prev
          ? {
              ...prev,
              debitTransactions: prev.debitTransactions.map(tx =>
                tx._id === txId ? { ...tx, status: newStatus } : tx
              ),
            }
          : null
      );
    }
  };

  // Modal handlers
  const handleOpenRejectModal = (txId: string) => {
    setTransactionId(txId);
    (document.getElementById('reason_modal') as HTMLDialogElement)?.showModal();
  };

  const handleReject = (reason: string) => {
    if (!transactionId) return;

    updateTransactionStatus(transactionId, 'rejected', reason);
    (document.getElementById('reason_modal') as HTMLDialogElement)?.close();
    setTransactionId(null);
  };

  // Loading state
  if (loading) {
    return <div className="p-6 text-center">Loading wallet data...</div>;
  }

  // No data
  if (!wallet) {
    return <div className="p-6 text-center text-error">No wallet data found.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      <WalletHeaderSection wallet={wallet} />

      <TransactionsSection
        transactions={transactions}
        onTransfer={id => updateTransactionStatus(id, 'success')}
        onReject={handleOpenRejectModal}
      />

      <RejectionReasonModal onSubmit={handleReject} />
    </div>
  );
};

export default AdminProviderWallet;
