import { create } from 'zustand';
import { UIState } from '../types/state';

interface UIStore extends UIState {
  setMobileNavOpen: (isOpen: boolean) => void;
  setActiveChallenge: (challengeId: string) => void;
  setEvaluating: (isEvaluating: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isMobileNavOpen: false,
  activeChallenge: 'basic',
  isEvaluating: false,
  setMobileNavOpen: (isOpen) => set({ isMobileNavOpen: isOpen }),
  setActiveChallenge: (challengeId) => set({ activeChallenge: challengeId }),
  setEvaluating: (isEvaluating) => set({ isEvaluating }),
})); 