// import Hero from './components/hero/Hero';
// import SubHero from './components/subhero/SubHero';
import Reviews from './components/reviews/Reviews';
import Story from './components/story/Story';
import BottomHero from './components/bottomhero/BottomHero';
import ZHero from './components/hero/ZHero';
import ZSubhero from './components/subhero/ZSubhero';

export default function Home() {
  return (
    <main className='w-full'>
      {/* <Hero logo='/images/vlht_logo.png' /> */}
      <ZHero />
      {/* <SubHero /> */}
      <ZSubhero />
      <Reviews />
      <Story />
      <BottomHero />
    </main>
  );
}
