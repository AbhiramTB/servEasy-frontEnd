export interface ISubscriptionPlan {
  _id?: string;
  name: string; 
  price: number;
  validityDays: number; 
  features: string[]; 
  adLimitPerMonth: number;
  payoutSpeedDays: number;
  description?: string;
}