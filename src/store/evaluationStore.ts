import { create } from 'zustand';
import { EvaluationResult } from '../types/state';

interface EvaluationStore {
  results: EvaluationResult[];
  isLoading: boolean;
  error: string | null;
  addResult: (result: EvaluationResult) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearResults: () => void;
}

export const useEvaluationStore = create<EvaluationStore>((set) => ({
  results: [],
  isLoading: false,
  error: null,
  addResult: (result) =>
    set((state) => ({
      results: [result, ...state.results],
      error: null,
    })),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clearResults: () => set({ results: [], error: null }),
})); 