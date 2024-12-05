import { create } from 'zustand';
import { User } from '../types/chat';
import { signIn, signOut, getCurrentUser } from '../lib/auth';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const { user, error } = await signIn(email, password);
      if (error) throw new Error(error);
      set({ user, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to login', 
        isLoading: false 
      });
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await signOut();
      set({ user: null, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to logout',
        isLoading: false 
      });
    }
  },

  checkAuth: async () => {
    set({ isLoading: true, error: null });
    try {
      const user = await getCurrentUser();
      set({ user, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to check auth',
        isLoading: false 
      });
    }
  },
}));