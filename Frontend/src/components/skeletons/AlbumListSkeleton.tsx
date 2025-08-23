const AlbumListSkeleton = () => {
  return Array.from({ length: 7 }).map((_, i) => (
    <div
      key={i}
      className="p-2 rounded-md flex items-center gap-3"
    >
      {/* Avatar / Icon skeleton */}
      <div
        className="w-12 h-12 rounded-md flex-shrink-0 
        bg-gradient-to-r from-indigo-900/60 via-indigo-800/50 to-indigo-900/60
        animate-pulse shadow-[0_0_10px_rgba(139,92,246,0.25)]"
      />

      {/* Text skeleton */}
      <div className="flex-1 min-w-0 hidden md:block space-y-2">
        <div
          className="h-4 rounded w-3/4 animate-pulse 
          bg-gradient-to-r from-indigo-900/60 via-indigo-800/50 to-indigo-900/60
          shadow-[0_0_8px_rgba(139,92,246,0.2)]"
        />
        <div
          className="h-3 rounded w-1/2 animate-pulse 
          bg-gradient-to-r from-indigo-900/60 via-indigo-800/50 to-indigo-900/60
          shadow-[0_0_6px_rgba(139,92,246,0.15)]"
        />
      </div>
    </div>
  ));
};

export default AlbumListSkeleton;
