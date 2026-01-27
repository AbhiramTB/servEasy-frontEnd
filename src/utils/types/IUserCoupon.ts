export interface IUserCoupon {
  _id: string;
  code: string;
  description: string;
  discountValue: number;
  minOrderAmount: number;
  validFrom: string;
  validTo: string;
  usageLimit: number;
  usedCount: number;
  showInBanner: boolean;
  isActive: boolean;
  usedBy: string[];
  createdAt: string;
  updatedAt: string;
}
