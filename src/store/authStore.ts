import { create } from 'zustand';
import { useToastStore } from './toastStore';

interface AuthState {
  accessToken: string | null;
  memberId: number;
  isLoggedIn: boolean;
  isTestUser: boolean;
  setAuth: (accessToken: string, memberId: number) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  const accessToken = localStorage.getItem('accessToken');
  const memberId = localStorage.getItem('memberId') ? Number(localStorage.getItem('memberId')) : 0;
  const isTestUser = memberId === 2;

  return {
    accessToken,
    memberId,
    isLoggedIn: !!accessToken,
    isTestUser,

    setAuth: (accessToken, memberId) => {
      const isTestUser = memberId === 2;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('memberId', String(memberId));
      set({ accessToken, memberId, isLoggedIn: true, isTestUser });
    },

    logout: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('memberId');
      set({ accessToken: null, memberId: 0, isLoggedIn: false, isTestUser: false });
      useToastStore.getState().showToast('로그아웃되었습니다.');
    },
  };
});
