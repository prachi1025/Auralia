/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "@/lib/axios";
import type { Album, Song } from "@/types";
import { create } from "zustand";

interface MusicStore {
    albums: Album[];
    songs: Song[];
    isLoading: boolean;
    error: string | null;
    currentAlbum: Album | null;

    fetchAlbums: () => Promise<void>;
    fetchAlbumById: (albumId: string) => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
    albums: [],
    songs: [],
    isLoading: false,
    error: null,
    currentAlbum: null,

    fetchAlbums: async () => {
         set({ isLoading: true, error: null });
         try {
             const response = await axiosInstance.get('/albums');
             set({ albums: response.data})
         } catch (err: any) {
             set({ error: err.rsponse.data.message });
         } finally {
             set({ isLoading: false });
         }
    },
    
    fetchAlbumById: async (albumId: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get(`/albums/${albumId}`);
            set({ currentAlbum: response.data }); // Update the currentAlbum state with the fetched data from the API response.data;
        } catch (err: any) {
            set({ error: err.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    }
}))