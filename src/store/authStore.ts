import { create } from 'zustand';
import { useToastStore } from './toastStore';

interface AuthState {
  accessToken: string | null;
  memberId: number;
  isLoggedIn: boolean;
  isTestUser: boolean;
  isCheckedPassword: boolean;
  setIsCheckedPassword: (value: boolean) => void;
  setAuth: (accessToken: string, memberId: number) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  const accessToken = localStorage.getItem('accessToken');
  const memberId = localStorage.getItem('memberId') ? Number(localStorage.getItem('memberId')) : 0;
  const isTestUser = memberId === 1;

  return {
    accessToken,
    memberId,
    isLoggedIn: !!accessToken,
    isTestUser,
    isCheckedPassword: false,

    setIsCheckedPassword: (value) => {
      set({ isCheckedPassword: value })},

    setAuth: (accessToken, memberId) => {
      const isTestUser = memberId === 1;
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
