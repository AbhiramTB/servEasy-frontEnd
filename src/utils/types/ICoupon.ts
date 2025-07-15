export interface ICoupon {
  _id?: string; 
  code: string;
  description?: string;
  discountValue: number;
  minOrderAmount?: number; 
  validFrom: Date;
  validTo: Date;
  usageLimit?: number; 
  usedCount?: number; 
  userId?: string; 
  showInBanner: boolean;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  
}