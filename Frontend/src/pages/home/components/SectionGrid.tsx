import type { Song } from "@/types";
import SectionGridSkeleton from "../../../components/skeletons/SectionGridSkeleton.tsx";
import { Button } from "@/components/ui/button";

type SectionGridProps = {
  title: string;
  songs: Song[];
  isLoading: boolean;
};

const SectionGrid = ({ songs, title, isLoading }: SectionGridProps) => {
  if (isLoading) return <SectionGridSkeleton />;

  return (
    <div className="mb-8 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-white">
          {title}
        </h2>
        <Button
          variant="link"
          className="text-sm text-slate-400 hover:text-sky-300 transition-colors"
        >
          Show all
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {songs.map((song) => (
          <div
            key={song._id}
            className="flex flex-col gap-2 bg-slate-900/70 hover:bg-white/5 
            border border-white/10 rounded-md overflow-hidden cursor-pointer group 
            transition-colors duration-300"
          >
            <div className="relative">
              <img
                src={song.imageUrl}
                alt={song.title}
                className="w-full aspect-square object-cover 
                rounded-t-md transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="px-3 pb-3">
              <h3 className="font-medium text-slate-100 truncate group-hover:text-sky-300 transition-colors">
                {song.title}
              </h3>
              <p className="text-sm text-slate-400 truncate group-hover:text-slate-200 transition-colors">
                {song.artist}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionGrid;