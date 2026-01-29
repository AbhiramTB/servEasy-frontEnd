import { ICoupon } from '../../../utils/types/ICoupon';
import { useForm } from 'react-hook-form';

interface Props {
  onSubmit: (data: ICoupon) => void;
  isLoading: Boolean;
}

export const CouponForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICoupon>();

  return (
    <div className="border shadow-xl card bg-base-100 border-base-300">
      <div className="card-body">
        <h2 className="mb-6 text-2xl font-bold card-title text-base-content">Create New Coupon</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="font-medium label-text text-base-content">
                Coupon Code <span className="text-error">*</span>
              </span>
            </label>
            <input
              {...register('code', { required: 'Coupon code is required' })}
              placeholder="Enter coupon code (e.g., SAVE20)"
              className={`input input-bordered w-full ${errors.code ? 'input-error' : ''}`}
            />
            {errors.code && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.code.message}</span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="font-medium label-text text-base-content">Description</span>
            </label>
            <textarea
              {...register('description')}
              placeholder="Brief description of the coupon offer"
              className="w-full h-20 resize-none textarea textarea-bordered"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="font-medium label-text text-base-content">
                Discount Value (₹) <span className="text-error">*</span>
              </span>
            </label>
            <input
              type="number"
              {...register('discountValue', {
                required: 'Discount value is required',
                min: { value: 1, message: 'Discount must be at least ₹1' },
              })}
              placeholder="Enter discount amount"
              className={`input input-bordered w-full ${errors.discountValue ? 'input-error' : ''}`}
            />
            {errors.discountValue && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.discountValue.message}</span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="font-medium label-text text-base-content">Minimum Order Amount (₹)</span>
            </label>
            <input
              type="number"
              {...register('minOrderAmount', {
                min: { value: 0, message: 'Minimum order amount cannot be negative' },
              })}
              placeholder="Enter minimum order amount (optional)"
              className={`input input-bordered w-full ${errors.minOrderAmount ? 'input-error' : ''}`}
            />
            {errors.minOrderAmount && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.minOrderAmount.message}</span>
              </label>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="form-control">
              <label className="label">
                <span className="font-medium label-text text-base-content">
                  Valid From <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="date"
                {...register('validFrom', { required: 'Start date is required' })}
                className={`input input-bordered w-full ${errors.validFrom ? 'input-error' : ''}`}
              />
              {errors.validFrom && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.validFrom.message}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="font-medium label-text text-base-content">
                  Valid To <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="date"
                {...register('validTo', { required: 'End date is required' })}
                className={`input input-bordered w-full ${errors.validTo ? 'input-error' : ''}`}
              />
              {errors.validTo && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.validTo.message}</span>
                </label>
              )}
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="font-medium label-text text-base-content">Usage Limit</span>
            </label>
            <input
              type="number"
              {...register('usageLimit', {
                min: { value: 1, message: 'Usage limit must be at least 1' },
              })}
              placeholder="Enter usage limit (leave empty for unlimited)"
              className={`input input-bordered w-full ${errors.usageLimit ? 'input-error' : ''}`}
            />
            {errors.usageLimit && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.usageLimit.message}</span>
              </label>
            )}
            <label className="label">
              <span className="label-text-alt text-base-content/70">Leave empty for unlimited usage</span>
            </label>
          </div>

          <div className="form-control">
            <label className="justify-start gap-3 cursor-pointer label">
              <input type="checkbox" {...register('showInBanner')} className="checkbox checkbox-primary" />
              <div>
                <span className="font-medium label-text text-base-content">Show in Banner</span>
                <p className="label-text-alt text-base-content/70">Display this coupon prominently on the website</p>
              </div>
            </label>
          </div>

          <div className="pt-4 form-control">
            {!isLoading && (
              <button type="submit" className="w-full btn btn-primary">
                Create Coupon
              </button>
            )}

            {isLoading && (
              <div className="w-full btn btn-primary">
                <span className="loading loading-bars loading-xl"></span>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
