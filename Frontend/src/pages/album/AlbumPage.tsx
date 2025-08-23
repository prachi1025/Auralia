import AlbumPageSkeleton from "@/components/skeletons/AlbumPageSkeleton"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useMusicStore } from "@/stores/useMusicStore"
import { Clock, Play } from "lucide-react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

const formatDuration = (durationInSeconds: number) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

const AlbumPage = () => {
    const { albumId } = useParams()
    const { fetchAlbumById, isLoading, currentAlbum} = useMusicStore()

    useEffect(() => {
    if (albumId) {
        fetchAlbumById(albumId)
    }
    }, [fetchAlbumById, albumId])

    // if (isLoading) {
    //     return <AlbumPageSkeleton />
    // }
  return (
    <>
        {isLoading && <AlbumPageSkeleton />}
        <div className="h-full">
            <ScrollArea>
                {/* Main Content */}
                <div className="relative min-h-full">
                    
                    {/* BG Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#1e1b4b] via-[#0f172a] to-[#090d15] pointer-events-none"></div>  

                    {/* Content */}
                    <div className="relative z-10">
                        <div className="flex p-6 gap-6 pb-8">
                            <img
                                src={currentAlbum?.imageUrl}
                                alt={currentAlbum?.title}
                                className="w-[240px] h-[240px] shadow-xl rounded"
                            />
                            <div className="flex flex-col justify-end">
                                <p className="text-sm font-medium">Album</p>
                                <h1 className="text-7xl font-bold my-4">{currentAlbum?.title}</h1>
                                <div className="flex items-center gap-2 text-sm to-zinc-100">
                                    <span className="font-medium text-white">{currentAlbum?.artist}</span>
                                    <span>•</span>
                                    <span>{currentAlbum?.releaseYear}</span>
                                    <span>•</span>
                                    <span>{currentAlbum?.songs.length} songs</span>
                                </div>
                            </div>
                        </div>

                        {/* Play Button */}
                        <div className="px-6">
                            <Button 
                                size={'icon'}
                                className="group relative w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-sky-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.6)] transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-[0_0_25px_rgba(168,85,247,0.9)]">
                                <Play className="w-7 h-7 ml-1 relative z-10 fill-white" />
                            </Button>
                        </div>

                        {/* Song List */}
                        <div className="backdrop-blur-sm mt-2">
                            {/* table header */}
							<div className='grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm  text-zinc-400 border-b border-white/5'>
								<div>#</div>
								<div>Title</div>
								<div>Released Date</div>
								<div>
									<Clock className='h-4 w-4' />
								</div>
							</div>
                            {/* table body */}
                            <div className="px-4">
                                <div className="space-y-2 py-4">
                                    {currentAlbum?.songs.map((song, index) => (
                                        <div 
                                            key={song._id} 
                                            className='grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm  text-zinc-300 hover:bg-white/5 rounded-md group cursor-pointer'
                                        >
                                            <div className="flex items-center justify-start">
                                                <span className="w-4 text-right group-hover:hidden">{index + 1}</span>
                                                <Play className="h-4 w-4 hidden group-hover:block" />
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <img 
                                                    src={song.imageUrl} 
                                                    alt={song.title} 
                                                    className="w-10 h-10"
                                                />
                                                <span className="font-medium">{song.title}</span>
                                                <span className="text-xs text-zinc-400">{song.artist}</span>
                                            </div>
                                            
                                            <div className="flex items-center">
                                                {song.createdAt.split('T')[0]}
                                            </div>
                                            <div className="flex items-center justify-start">
                                                {formatDuration(song.duration)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </div>
    </>
  )
}

export default AlbumPage