import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'fill-warning text-warning' : 'fill-gray-300 text-gray-300'}`}
        />
      ))}
    </div>
  );
};
