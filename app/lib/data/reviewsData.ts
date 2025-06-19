export const fetchGoogleReviews = async () => {
  const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;
  const apiKey = process.env.GOOGLE_API_KEY;

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`
  );

  const data = await response.json();

  if (!data.result) {
    throw new Error('No reviews found');
  }

  return data.result.reviews;
};
