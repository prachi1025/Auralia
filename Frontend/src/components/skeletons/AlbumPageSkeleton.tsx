import { ScrollArea } from "@/components/ui/scroll-area"
import { Clock } from "lucide-react"

const AlbumPageSkeleton = () => {
  return (
    <div className="h-full">
      <ScrollArea>
        <div className="relative min-h-full">
          {/* BG Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e1b4b] via-[#0f172a] to-[#090d15] pointer-events-none"></div>

          {/* Content */}
          <div className="relative z-10 animate-pulse">
            {/* Header Skeleton */}
            <div className="flex p-6 gap-6 pb-8">
              {/* Album Cover */}
              <div className="w-[240px] h-[240px] bg-zinc-700/40 rounded shadow-xl" />

              {/* Album Info */}
              <div className="flex flex-col justify-end space-y-4">
                <div className="h-4 w-16 bg-zinc-700/40 rounded" /> {/* Album label */}
                <div className="h-12 w-64 bg-zinc-700/40 rounded" /> {/* Album title */}
                <div className="flex items-center gap-2">
                  <div className="h-4 w-20 bg-zinc-700/40 rounded" />
                  <div className="h-4 w-4 bg-zinc-700/40 rounded-full" />
                  <div className="h-4 w-16 bg-zinc-700/40 rounded" />
                  <div className="h-4 w-4 bg-zinc-700/40 rounded-full" />
                  <div className="h-4 w-12 bg-zinc-700/40 rounded" />
                </div>
              </div>
            </div>

            {/* Play Button Skeleton */}
            <div className="px-6">
              <div className="w-16 h-16 bg-zinc-700/40 rounded-full" />
            </div>

            {/* Song List Skeleton */}
            <div className="backdrop-blur-sm mt-4">
              {/* Table Header */}
              <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5">
                <div>#</div>
                <div>Title</div>
                <div>Released Date</div>
                <div>
                  <Clock className="h-4 w-4" />
                </div>
              </div>

              {/* Skeleton Rows */}
              <div className="px-4">
                <div className="space-y-2 py-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm text-zinc-300 rounded-md"
                    >
                      {/* Index */}
                      <div className="h-4 w-4 bg-zinc-700/40 rounded" />

                      {/* Song Info */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-zinc-700/40 rounded" />
                        <div className="flex flex-col gap-1">
                          <div className="h-4 w-24 bg-zinc-700/40 rounded" />
                          <div className="h-3 w-16 bg-zinc-700/40 rounded" />
                        </div>
                      </div>

                      {/* Release Year */}
                      <div className="h-4 w-12 bg-zinc-700/40 rounded" />

                      {/* Duration */}
                      <div className="h-4 w-10 bg-zinc-700/40 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

export default AlbumPageSkeleton
