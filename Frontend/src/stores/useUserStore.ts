/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'
import { axiosInstance } from '@/lib/axios';

interface UserStore {
    users: any[];
    isLoading: boolean;
    error: string | null;
    
    fetchUsers: () => Promise<void>;
}

const useUserStore = create<UserStore>((set) => ({
    users: [],
    isLoading: false, 
    error: null,

    fetchUsers: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get('/users');
            set({ users: response.data, isLoading: false });
        } catch (error: any) {
            set({ error: error.message || 'Failed to fetch users' });
        } finally {
            set({ isLoading: false });
        }
    },
    
}));

export default useUserStore