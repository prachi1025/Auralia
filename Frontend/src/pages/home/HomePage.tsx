import { useMusicStore } from '@/stores/useMusicStore.ts';
import Topbar from '../../components/Topbar.tsx';
import { useEffect, useMemo } from 'react';
import FeaturedSection from './components/FeaturedSection.tsx';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';
import SectionGrid from './components/SectionGrid.tsx';
import { SignedIn } from '@clerk/clerk-react';

const HomePage = () => {
  const {
    fetchFeaturedSongs,
    fetchMadeForYouSongs,
    fetchTrendingSongs,
    isLoading,
    madeForYouSongs,
    trendingSongs,
  } = useMusicStore();

  useEffect(() => {
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();
  }, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);

  // ✅ Dynamic greeting based on time
  const greeting = useMemo(() => {
    const hour = new Date().getHours();

    if (hour >= 4 && hour < 12) {
      return "☀️ Morning vibes, sunshine!";
    } else if (hour >= 12 && hour < 16) {
      return "🌸 Hope your afternoon feels light";
    } else if (hour >= 16 && hour < 21) {
      return "🌆 Cozy evening, unwind a little";
    } else {
      return "🌙 Night glow, sweet dreams soon";
    }
  }, []);

  return (
    <main className="rounded-md overflow-hidden h-full bg-gradient-to-b from-[#1e1b4b]/80 to-[#0f172a]/80">
      <Topbar />
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold mb-6 text-white">
            {greeting}
          </h1>
          <FeaturedSection />
        </div>
        <div className='space-y-8'>
          <SignedIn>
            <SectionGrid songs={madeForYouSongs} title='Made for you' isLoading={isLoading} />
          </SignedIn>

          <SectionGrid songs={trendingSongs} title='Trending' isLoading={isLoading} />
        </div>
      </ScrollArea>
    </main>
  );
};

export default HomePage;