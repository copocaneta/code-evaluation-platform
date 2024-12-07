import { create } from 'zustand';
import { EvaluationResult } from '../types/state';

interface EvaluationStore {
  results: EvaluationResult[];
  isLoading: boolean;
  error: string | null;
  addResult: (result: EvaluationResult) => void;
  clearResults: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useEvaluationStore = create<EvaluationStore>((set) => ({
  results: [],
  isLoading: false,
  error: null,
  addResult: (result) => set((state) => ({ results: [result, ...state.results] })),
  clearResults: () => set({ results: [] }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
})); 