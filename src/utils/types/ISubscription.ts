export type ISubscriptionStatus=  'active' | 'expired'|"pending";

export interface ISubscription {
  planId: string;
  startDate: Date;
  endDate: Date;
  status:ISubscriptionStatus
  createdAt?: Date;
  paymentId: string;
}