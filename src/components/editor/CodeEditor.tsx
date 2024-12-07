import { Box } from '@chakra-ui/react';
import Editor from '@monaco-editor/react';
import { useCallback } from 'react';
import { useSettingsStore } from '../../store/settingsStore';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
}

const CodeEditor = ({ value, onChange, language = 'javascript' }: CodeEditorProps) => {
  const { editor, theme } = useSettingsStore();

  const handleEditorChange = useCallback(
    (value: string | undefined) => {
      onChange(value || '');
    },
    [onChange]
  );

  return (
    <Box h="100%" borderRadius="md" overflow="hidden" position="relative">
      <Editor
        height="100%"
        defaultLanguage={language}
        value={value}
        onChange={handleEditorChange}
        theme={theme.colorMode === 'dark' ? 'vs-dark' : 'vs-light'}
        options={{
          minimap: { enabled: editor.showMinimap },
          fontSize: theme.fontSize,
          fontFamily: editor.fontFamily,
          tabSize: editor.tabSize,
          wordWrap: editor.lineWrapping ? 'on' : 'off',
          lineNumbers: editor.showLineNumbers ? 'on' : 'off',
          roundedSelection: true,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 8 },
        }}
      />
    </Box>
  );
};

export default CodeEditor; 