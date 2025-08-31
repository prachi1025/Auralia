import { Button } from "@/components/ui/button"
import { usePlayerStore } from "@/stores/usePlayerStore"
import type { Song } from "@/types"
import { Play, Pause } from "lucide-react"

const PlayButton = ({ song }: { song: Song }) => {
  const { currentSong, isPlaying, setCurrentSong, togglePlay } = usePlayerStore()
  const isCurrentSong = currentSong?._id === song._id

  const handlePlay = () => {
    if (isCurrentSong) togglePlay()
    else setCurrentSong(song)
  }

  return (
    <Button
      onClick={handlePlay}
      size="icon"
      className={`group relative size-10 rounded-full 
        bg-gradient-to-tr from-pink-500 via-purple-500 to-sky-500 
        text-white shadow-[0_0_12px_rgba(168,85,247,0.6)] 
        transition-all duration-300 
        hover:scale-110 active:scale-95 mr-2 shrink-0
        hover:shadow-[0_0_20px_rgba(168,85,247,0.9)]
        ${isCurrentSong ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
      `}
    >
      {isCurrentSong && isPlaying ? (
        <Pause className="w-5 h-5 relative z-10 fill-white" />
      ) : (
        <Play className="w-5 h-5 ml-1 relative z-10 fill-white" />
      )}
    </Button>
  )
}

export default PlayButton
