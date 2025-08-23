import AlbumListSkeleton from "@/components/skeletons/AlbumListSkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { SignedIn } from "@clerk/clerk-react";
import { HomeIcon, Library, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const LeftSidebar = ({ isCompact }: { isCompact: boolean }) => {
  const isLoading = true;

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
              "text-slate-200 font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95"
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
                "text-slate-200 font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95"
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
              <div></div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeftSidebar;
