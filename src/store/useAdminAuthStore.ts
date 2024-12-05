import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminAuthState {
  isAdminAuthenticated: boolean;
  adminLogin: (password: string) => boolean;
  adminLogout: () => void;
}

export const useAdminAuthStore = create<AdminAuthState>()(
  persist(
    (set) => ({
      isAdminAuthenticated: false,
      adminLogin: (password: string) => {
        const isValid = password === 'ainidewo42';
        if (isValid) {
          set({ isAdminAuthenticated: true });
        }
        return isValid;
      },
      adminLogout: () => {
        set({ isAdminAuthenticated: false });
      },
    }),
    {
      name: 'admin-auth',
    }
  )
);