import { create } from 'zustand';
import { Challenge } from '../types/challenge';
import { challengeLoader } from '../services/challengeLoader';

interface ChallengeStore {
  challenges: Challenge[];
  activeChallenge: Challenge | null;
  setActiveChallenge: (challengeId: string) => void;
  loadChallenges: () => Promise<void>;
  isLoading: boolean;
}

export const useChallengeStore = create<ChallengeStore>((set, get) => ({
  challenges: [],
  activeChallenge: null,
  isLoading: true,
  setActiveChallenge: (challengeId) => {
    const challenge = get().challenges.find((c) => c.id === challengeId);
    if (challenge) {
      set({ activeChallenge: challenge });
    }
  },
  loadChallenges: async () => {
    if (get().challenges.length > 0) return; // Don't reload if we already have challenges
    
    set({ isLoading: true });
    try {
      const challenges = challengeLoader.getChallenges();
      set({
        challenges,
        activeChallenge: challenges[0] || null,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error loading challenges:', error);
      set({ isLoading: false });
    }
  },
})); 