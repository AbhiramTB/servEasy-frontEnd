import { IReview } from '../../../utils/types/IReview';
import { ReviewItem } from './ReviewItem';
import { StarRating } from './StarRating';

interface ReviewListProps {
  reviews: IReview[];
  averageRating: number;
  totalReviews: number;
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews, averageRating, totalReviews }) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h3 className="text-2xl font-bold text-base-content mb-4">Customer Reviews</h3>

        <div className="flex items-center gap-2 mb-6">
          <StarRating rating={averageRating} />
          <span className="text-base-content/70">({totalReviews} reviews)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map(review => (
            <ReviewItem key={review._id} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewList;
