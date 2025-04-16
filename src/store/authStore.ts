import { create } from 'zustand';

interface AuthState {
  accessToken: string | null;
  memberId: number | null;
  isLoggedIn: boolean;
  setAuth: (accessToken: string, memberId: number) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem('accessToken'),
  memberId: localStorage.getItem('memberId') ? Number(localStorage.getItem('memberId')) : null,
  isLoggedIn: !!localStorage.getItem('accessToken'),

  setAuth: (accessToken, memberId) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('memberId', String(memberId));
    set({ accessToken, memberId, isLoggedIn: true });
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('memberId');
    set({ accessToken: null, memberId: null, isLoggedIn: false });
  },
}));
