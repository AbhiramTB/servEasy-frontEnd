import { IReview } from '../../../utils/types/IReview';
import InitialAvatar from '../../../utils/ui/InitialAvatar';
import { StarRating } from './StarRating';

interface ReviewItemProps {
  review: IReview;
}

export const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  return (
    <div className="border border-base-300 rounded-lg p-4">
      <div className="flex items-center gap-3 mb-3">
        <InitialAvatar imageSrc={review.userProfile} name={review.userName} />
        <div>
          <h4 className="font-semibold text-base-content">{review.userName}</h4>
          <StarRating rating={review.rating} />
        </div>
      </div>

      <p className="text-sm text-base-content/70">{review.comment}</p>
    </div>
  );
};
