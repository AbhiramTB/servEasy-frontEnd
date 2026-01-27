export type WalletTransaction = {
  _id: string
  type: 'credit' | 'debit'
  amount: number
  status: 'none' | 'pending' | 'success' | 'rejected'
  refBookingId?: string | null
  note?: string | null
  date: string
}

export type ProviderWallet = {
  serviceProviderId: string
  balance: number
  transactions: WalletTransaction[]
}

export interface IWalletTransactionView {
  _id: string;
  type: 'credit' | 'debit';
  amount: number;
  status: 'none' | 'pending' | 'success' | 'rejected' | string;
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
  isSubscribedProvider: boolean;
}
