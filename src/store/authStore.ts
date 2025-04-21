import { create } from 'zustand';
import { useToastStore } from './toastStore';

interface AuthState {
  accessToken: string | null;
  memberId: number;
  isLoggedIn: boolean;
  setAuth: (accessToken: string, memberId: number) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem('accessToken'),
  memberId: localStorage.getItem('memberId') ? Number(localStorage.getItem('memberId')) : 0,
  isLoggedIn: !!localStorage.getItem('accessToken'),

  setAuth: (accessToken, memberId) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('memberId', String(memberId));
    set({ accessToken, memberId, isLoggedIn: true });
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('memberId');
    set({ accessToken: null, memberId: 0, isLoggedIn: false });
    useToastStore.getState().showToast('로그아웃되었습니다.');
  },
}));
