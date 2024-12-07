import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeSettings {
  colorMode: 'light' | 'dark' | 'system';
  colorScheme: 'default' | 'high-contrast' | 'custom';
  fontSize: number;
}

interface EditorSettings {
  fontFamily: string;
  tabSize: number;
  lineWrapping: boolean;
  autoSave: boolean;
  autoSaveInterval: number;
  showLineNumbers: boolean;
  showMinimap: boolean;
}

interface SettingsState {
  theme: ThemeSettings;
  editor: EditorSettings;
  setTheme: (theme: Partial<ThemeSettings>) => void;
  setEditor: (editor: Partial<EditorSettings>) => void;
  resetSettings: () => void;
}

const defaultSettings = {
  theme: {
    colorMode: 'system' as const,
    colorScheme: 'default' as const,
    fontSize: 14,
  },
  editor: {
    fontFamily: 'Monaco, monospace',
    tabSize: 2,
    lineWrapping: true,
    autoSave: true,
    autoSaveInterval: 30,
    showLineNumbers: true,
    showMinimap: false,
  },
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...defaultSettings,
      setTheme: (theme) =>
        set((state) => ({
          theme: { ...state.theme, ...theme },
        })),
      setEditor: (editor) =>
        set((state) => ({
          editor: { ...state.editor, ...editor },
        })),
      resetSettings: () => set(defaultSettings),
    }),
    {
      name: 'settings-storage',
    }
  )
); 