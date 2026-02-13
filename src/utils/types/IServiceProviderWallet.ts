export interface IBankDetailsWallet {
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
}
type WalletTransaction = {
  _id?: string;
  amount: number;
  type: 'credit' | 'debit';
  status: string;
  date: string;
  refBookingId: string;
  note?: string | null;
};

export type ProviderWalletProps = {
  balance: number;
  serviceProviderId: string;
  transactions: WalletTransaction[];
  bankDetails?: IBankDetailsWallet;
  refreshData?: () => void;
};
