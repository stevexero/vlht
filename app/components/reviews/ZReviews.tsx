import { fetchGoogleReviews } from '@/app/lib/data/reviewsData';
import ReviewsClient from './ReviewsClient';

export default async function ZReviews() {
  const reviews = await fetchGoogleReviews();

  return (
    <div id='reviews'>
      <ReviewsClient reviews={reviews} />
    </div>
  );
}
