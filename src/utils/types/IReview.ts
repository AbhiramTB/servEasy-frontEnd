
  export interface IReview {
  _id: string;
  rating: number;
  comment: string;
  userName: string;
  userProfile: string;
}

 export interface IReviewDetails{
  avgRating: number;
  totalReviews: number;
}