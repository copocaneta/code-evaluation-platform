import { useEffect, useCallback } from 'react';
import { useEditorStore } from '../store/editorStore';
import { useToast } from '../components/ui/Toast';

export const useKeyboardShortcuts = () => {
  const { setCode, clearEditor } = useEditorStore();
  const toast = useToast();

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    // Cmd/Ctrl + S to save
    if ((event.metaKey || event.ctrlKey) && event.key === 's') {
      event.preventDefault();
      toast.info('Auto-save enabled', 'Your code is automatically saved');
    }

    // Cmd/Ctrl + K to clear
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault();
      clearEditor();
      toast.success('Editor cleared');
    }
  }, [clearEditor, toast]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);
}; 