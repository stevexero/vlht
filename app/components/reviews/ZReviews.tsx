import { fetchGoogleReviews } from '@/app/lib/data/reviewsData';
import ReviewsClient from './ReviewsClient';

export default async function ZReviews() {
  const reviews = await fetchGoogleReviews();

  return (
    <div>
      <ReviewsClient reviews={reviews} />
    </div>
  );
}
