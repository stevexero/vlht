import Story from './components/story/Story';
import BottomHero from './components/bottomhero/BottomHero';
import ZHero from './components/hero/ZHero';
import ZSubhero from './components/subhero/ZSubhero';
import ZReviews from './components/reviews/ZReviews';

export default function Home() {
  return (
    <main className='w-full'>
      <ZHero />
      <ZSubhero />
      <ZReviews />
      <Story />
      <BottomHero />
    </main>
  );
}
