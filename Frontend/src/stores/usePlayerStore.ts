import { create } from "zustand";
import type { Song } from "@/types";

interface PlayerStore {
    currentSong: Song | null;
    isPlaying: boolean;
    queue: Song[];
    currentIndex: number;
    
    initializeQueue: (songs: Song[]) => void;
    playAlbum: (songs: Song[], startIndex?: number) => void;
    setCurrentSong: (song: Song | null) => void;
    togglePlay: () => void;
    playNext: () => void;
    playPrevious: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
    currentSong: null,
    isPlaying: false,
    queue: [],
    currentIndex: -1,

    //this function will initialize the queue by setting the current song to the first song in the queue and the current index to 0 
    initializeQueue: (songs: Song[]) => {
        set({
            queue: songs,
            currentSong: get().currentSong || songs[0],
            currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex
        })
    },

    //this function will play an album by setting the queue to the songs array and the current song to the first song in the array 
    playAlbum: (songs: Song[], startIndex = 0) => {
        if (songs.length === 0) return 

        const song = songs[startIndex];

        set({
            queue: songs,
            currentSong: song,
            currentIndex: startIndex,
            isPlaying: true,
        });
    },

    //this function will set the current song by setting the current song to the song passed in 
    setCurrentSong: (song: Song | null) => {
        if (!song) return;

        const songIndex = get().queue.findIndex((s) => s._id === song._id);
		set({
			currentSong: song,
			isPlaying: true,
			currentIndex: songIndex !== -1 ? songIndex : get().currentIndex,
		});
    },

    //this function will toggle the play state by setting the isPlaying state to the opposite of what it is currently
    togglePlay: () => {
        const willStartPlaying = !get().isPlaying;

        set({
            isPlaying: willStartPlaying,
        });
    },

    //this function will play the next song in the queue by setting the current song to the next song in the queue and the current index to the next index 
    playNext: () => {
        const { queue, currentIndex } = get();
        const nextIndex = currentIndex + 1

        if (nextIndex < queue.length) {
           const nextSong = queue[nextIndex];
            set({
                currentSong: nextSong,
                currentIndex: nextIndex,
                isPlaying: true
            }); 
        } else {
            set({ isPlaying: false });
        }
        
    },

    //this function will play the previous song in the queue by setting the current song to the previous song in the queue and the current index to the previous index
    playPrevious: () => {
        const { queue, currentIndex } = get();
        const prevIndex = currentIndex - 1

        if (prevIndex >= 0) {
            const prevSong = queue[prevIndex];
            set({
                currentSong: prevSong,
                currentIndex: prevIndex,
                isPlaying: true
            });
        } else {
            set({ isPlaying: false });
        }
    },
})
);