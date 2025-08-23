import AlbumListSkeleton from "@/components/skeletons/AlbumListSkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useMusicStore } from "@/stores/useMusicStore";
import { SignedIn } from "@clerk/clerk-react";
import { HomeIcon, Library, MessageCircle } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const LeftSidebar = ({ isCompact }: { isCompact: boolean }) => {
  const { albums, fetchAlbums, isLoading } = useMusicStore();

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  return (
    <div className="h-full flex flex-col gap-2">
      {/* Navigation menu */}
      <div className="rounded-xl bg-gradient-to-b from-[#0f172a]/80 via-[#1e1b4b]/80 to-[#0f172a]/80 p-3 shadow-lg">
        <div className="space-y-1">
          {/* Home Button */}
          <Link
            to={"/"}
            className={cn(
              "relative flex items-center justify-start gap-2 px-3 py-2 rounded-lg",
              "font-semibold text-slate-200 text-sm transition-all duration-300",
              "hover:bg-white/10 hover:shadow-[0_0_12px_rgba(139,92,246,0.5)]"
            )}
          >
            <HomeIcon className="size-5 text-slate-200" />
            {!isCompact && <span>Home</span>}
          </Link>

          <SignedIn>
            {/* Messages Button */}
            <Link
              to={"/chat"}
              className={cn(
                "relative flex items-center justify-start gap-2 px-3 py-2 rounded-lg",
                "font-semibold text-slate-200 text-sm transition-all duration-300",
                "hover:bg-white/10 hover:shadow-[0_0_12px_rgba(139,92,246,0.5)]"
              )}
            >
              <MessageCircle className="size-5 text-slate-200" />
              {!isCompact && <span>Messages</span>}
            </Link>
          </SignedIn>
        </div>
      </div>

      {/* Albums Section */}
      <div className="flex-1 rounded-xl p-4 bg-gradient-to-b from-[#0f172a]/80 via-[#1e1b4b]/80 to-[#0f172a]/80 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center px-2">
            <Library className="size-5 mr-2" />
            {!isCompact && <span>Albums</span>}
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-2">
            {isLoading ? (
              <AlbumListSkeleton />
            ) : (
              albums.map((album) => (
                <Link
                  to={`/albums/${album._id}`}
                  key={album._id}
                  className={cn(
                    "flex items-center gap-3 p-2 rounded-lg transition-all duration-300",
                    "text-slate-200 text-sm hover:bg-white/10 hover:shadow-[0_0_12px_rgba(139,92,246,0.5)]"
                  )}
                >
                  <img
                    src={album.imageUrl}
                    alt={album.title}
                    className="w-10 h-10 rounded-md object-cover"
                  />
                  {!isCompact && (
                    <div className="flex flex-col">
                      <span className="font-medium">{album.title}</span>
                      <span className="text-xs text-slate-400">
                        {album.artist}
                      </span>
                    </div>
                  )}
                </Link>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeftSidebar;
