export interface EvaluationResult {
  id: string;
  timestamp: string;
  status: 'success' | 'error' | 'warning';
  content: string;
}

export interface Challenge {
  id: string;
  label: string;
  description: string;
  defaultLanguage: string;
  defaultCode: string;
}

export interface EditorState {
  code: string;
  language: string;
  isEditorReady: boolean;
}

export interface UIState {
  isMobileNavOpen: boolean;
  activeChallenge: string;
  isEvaluating: boolean;
} 