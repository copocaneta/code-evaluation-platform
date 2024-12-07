import { create } from 'zustand';
import { Challenge } from '../types/challenge';
import { challengeLoader } from '../services/challengeLoader';

interface ChallengeStore {
  challenges: Challenge[];
  activeChallenge: Challenge | null;
  setActiveChallenge: (challengeId: string) => void;
  loadChallenges: () => void;
}

export const useChallengeStore = create<ChallengeStore>((set) => ({
  challenges: [],
  activeChallenge: null,
  setActiveChallenge: (challengeId) =>
    set((state) => ({
      activeChallenge: state.challenges.find((c) => c.id === challengeId) || state.activeChallenge,
    })),
  loadChallenges: () => {
    const challenges = challengeLoader.getChallenges();
    set({
      challenges,
      activeChallenge: challenges[0] || null,
    });
  },
})); 