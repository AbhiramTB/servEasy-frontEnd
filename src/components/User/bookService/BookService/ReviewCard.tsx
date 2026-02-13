import React, { useState } from 'react';
import { postRequest } from '../../../../utils/makeRequestInstance';
import { HotToastSuccess, HotToastError } from '../../../../utils/notificationToast';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { IReview } from '../../../../utils/types/IReview';

interface IReviewCardProp {
  bookedServiceId: string;
  serviceId: string;
  review: IReview | null;
}

const ReviewCard: React.FC<IReviewCardProp> = ({ bookedServiceId, serviceId, review }) => {
  const [rating, setRating] = useState<number>(review?.rating || 5);
  const [comment, setComment] = useState<string>(review?.comment || '');
  const [loading, setLoading] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(!review);
  const [submitted, setSubmitted] = useState<boolean>(!!review);
  const userId = useSelector((state: RootState) => state.user._id);
  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await postRequest('/reviews', {
        bookedServiceId,
        serviceId,
        userId,
        rating,
        comment,
      });
      if (res.status === 201) {
        HotToastSuccess('Thanks for your feedback! Your rating was submitted successfully');
        setSubmitted(true);
        setShowForm(false);
      }
    } catch (error) {
      HotToastError('Failed to submit review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 shadow-xl card bg-base-100">
      <div className="card-body">
        {submitted || review ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-primary">Your Review</h3>
            </div>

            {!showForm && (
              <div className="p-4 rounded-lg bg-base-200">
                <div className="flex mb-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <svg
                      key={star}
                      className={`w-5 h-5 ${star <= (review?.rating || rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700">{review?.comment || comment}</p>
              </div>
            )}
          </div>
        ) : (
          <h3 className="mb-4 text-lg font-semibold text-primary">Rate your experience</h3>
        )}

        {showForm && (
          <div className="space-y-4">
            <div className="flex justify-center mb-4 rating rating-lg">
              {[1, 2, 3, 4, 5].map(star => (
                <input
                  key={star}
                  type="radio"
                  name="rating-2"
                  className="bg-orange-400 mask mask-star-2"
                  checked={rating === star}
                  onChange={() => handleRatingChange(star)}
                />
              ))}
            </div>
            <textarea
              className="w-full textarea textarea-bordered"
              placeholder="Share your experience (optional)"
              value={comment}
              onChange={e => setComment(e.target.value)}
              rows={4}
            ></textarea>

            <div className="flex gap-2">
              <button className="flex-1 btn btn-primary" onClick={handleSubmit} disabled={loading}>
                {loading ? (
                  <span className="loading loading-dots loading-md"></span>
                ) : review ? (
                  'Update Review'
                ) : (
                  'Submit Review'
                )}
              </button>

              {review && (
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    setShowForm(false);
                    setRating(review.rating);
                    setComment(review.comment);
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        )}

        {!review && !submitted && !showForm && (
          <button className="mt-4 btn btn-outline btn-primary btn-block" onClick={() => setShowForm(true)}>
            Write a Review
          </button>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
