import { Suspense } from 'react';
import Ride from './components/ride/Ride';

export default function ZStory() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Ride />
      </Suspense>
    </div>
  );
}
