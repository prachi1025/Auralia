import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { usePlayerStore } from "@/stores/usePlayerStore"
import {
	Pause,
	Play,
	Repeat,
	Shuffle,
	SkipBack,
	SkipForward,
	Volume1,
	VolumeX,
} from "lucide-react"
import React, { useRef } from "react"

const formatTime = (seconds: number) => {
	const minutes = Math.floor(seconds / 60)
	const remainingSeconds = Math.floor(seconds % 60)
	return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}

const PlaybackControls = () => {
	const { currentSong, isPlaying, togglePlay, playNext, playPrevious } =
		usePlayerStore()

	const audioRef = useRef<HTMLAudioElement | null>(null)
	const [volume, setVolume] = React.useState(50)
	const [muted, setMuted] = React.useState(audioRef.current?.muted)
	const [duration, setDuration] = React.useState(0)
	const [currentTime, setCurrentTime] = React.useState(0)

	const toggleMute = () => {
		if (audioRef.current) {
			audioRef.current.muted = !audioRef.current.muted
			setMuted(audioRef.current.muted)

			if (audioRef.current.muted) {
				setVolume(0)
			} else {
				const lastVolume = audioRef.current.volume * 100 || 50
				setVolume(lastVolume)
			}
		}
	}

	React.useEffect(() => {
		audioRef.current = document.querySelector("audio")

		const audio = audioRef.current
		if (!audio) return

		const updateTime = () => setCurrentTime(audio.currentTime)
		const updateDuration = () => setDuration(audio.duration)

		audio.addEventListener("timeupdate", updateTime)
		audio.addEventListener("loadedmetadata", updateDuration)

		const handleEnded = () => {
			usePlayerStore.setState({ isPlaying: false })
		}

		audio.addEventListener("ended", handleEnded)

		return () => {
			audio.removeEventListener("timeupdate", updateTime)
			audio.removeEventListener("loadedmetadata", updateDuration)
			audio.removeEventListener("ended", handleEnded)
		}
	}, [currentSong])

	const handleSeek = (value: number[]) => {
		if (!audioRef.current) return
		audioRef.current.currentTime = value[0]
	}

	return (
		<footer
			className='relative z-20 h-20 sm:h-24 shrink-0
  bg-gradient-to-r from-[#0f172a] via-[#1e1b4b] to-[#0f172a]
  border-t border-white/10 backdrop-blur-md px-4'>
			<div className='flex justify-between items-center h-full max-w-[1800px] mx-auto'>
				{/* currently playing song */}
				<div className='hidden sm:flex items-center gap-4 min-w-[180px] w-[30%]'>
					{currentSong && (
						<>
							<img
								src={currentSong.imageUrl}
								alt={currentSong.title}
								className='w-14 h-14 object-cover rounded-md shadow-md'
							/>
							<div className='flex-1 min-w-0'>
								<div className='font-medium truncate hover:underline cursor-pointer text-white'>
									{currentSong.title}
								</div>
								<div className='text-sm text-zinc-400 truncate hover:underline cursor-pointer'>
									{currentSong.artist}
								</div>
							</div>
						</>
					)}
				</div>

				{/* player controls */}
				<div className='flex flex-col items-center gap-2 flex-1 max-w-full sm:max-w-[45%]'>
					<div className='flex items-center gap-4 sm:gap-6'>
						<Button
							size='icon'
							className='bg-transparent hidden sm:inline-flex text-zinc-400 hover:bg-transparent cursor-default'>
							<Shuffle className='h-4 w-4' />
						</Button>

						<Button
							size='icon'
							variant='ghost'
							className='text-zinc-400 hover:text-white hover:bg-gradient-to-br from-pink-500 to-sky-500
              transition-colors'
							onClick={playPrevious}
							disabled={!currentSong}>
							<SkipBack className='h-4 w-4' />
						</Button>

						<Button
							size='icon'
							className='bg-white hover:bg-white/90 text-black rounded-full h-9 w-9 shadow-md transition'
							onClick={togglePlay}
							disabled={!currentSong}>
							{isPlaying ? (
								<Pause className='h-5 w-5' />
							) : (
								<Play className='h-5 w-5' />
							)}
						</Button>

						<Button
							size='icon'
							variant='ghost'
							className='text-zinc-400 hover:text-white hover:bg-gradient-to-br from-pink-500 to-sky-500
              transition-colors'
							onClick={playNext}
							disabled={!currentSong}>
							<SkipForward className='h-4 w-4' />
						</Button>

						<Button
							size='icon'
							className='bg-transparent hidden sm:inline-flex text-zinc-400 hover:bg-transparent cursor-default'>
							<Repeat className='h-4 w-4' />
						</Button>
					</div>

					<div className='hidden sm:flex items-center gap-2 w-full'>
						<div className='text-xs text-zinc-400'>
							{formatTime(currentTime)}
						</div>
						<Slider
							value={[currentTime]}
							max={duration || 100}
							step={1}
							className='w-full hover:cursor-grab active:cursor-grabbing'
							onValueChange={handleSeek}
						/>
						<div className='text-xs text-zinc-400'>{formatTime(duration)}</div>
					</div>
				</div>

				{/* volume controls */}
				<div className='hidden sm:flex items-center gap-4 min-w-[180px] w-[30%] justify-end'>
					<div className='flex items-center gap-2'>
						<Button
							size='icon'
							variant='ghost'
							onClick={toggleMute}
							className='text-zinc-400 hover:text-white hover:bg-gradient-to-br from-pink-500 to-sky-500
              transition-colors'>
							{!muted ? (
								<Volume1 className='h-4 w-4' />
							) : (
								<VolumeX className='h-4 w-4' />
							)}
						</Button>

						<Slider
							value={[muted ? 0 : volume]}
							max={100}
							step={1}
							className='w-24 hover:cursor-grab active:cursor-grabbing'
							onValueChange={(value) => {
								setVolume(value[0])
								if (audioRef.current) {
									audioRef.current.volume = value[0] / 100
									if (value[0] === 0) {
										audioRef.current.muted = true
										setMuted(true)
									} else {
										audioRef.current.muted = false
										setMuted(false)
									}
								}
							}}
						/>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default PlaybackControls
