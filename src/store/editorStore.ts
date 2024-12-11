import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EditorState } from '../types/state';

interface EditorStore extends EditorState {
  setCode: (code: string) => void;
  setLanguage: (language: string) => void;
  setEditorReady: (isReady: boolean) => void;
  clearEditor: () => void;
}

export const useEditorStore = create<EditorStore>()(
  persist(
    (set) => ({
      code: '',
      language: 'python',
      isEditorReady: false,
      setCode: (code) => {
        if (code) {
          console.log('Setting editor code:', code.substring(0, 50) + '...');
        }
        set({ code: code || '' });
      },
      setLanguage: (language) => set({ language }),
      setEditorReady: (isEditorReady) => set({ isEditorReady }),
      clearEditor: () => set({ code: '' }),
    }),
    {
      name: 'editor-storage',
      partialize: (state) => ({ language: state.language }),
    }
  )
); 