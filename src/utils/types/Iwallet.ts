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
