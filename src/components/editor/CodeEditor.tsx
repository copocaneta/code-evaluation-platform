import { Box } from '@chakra-ui/react';
import Editor, { type EditorProps } from '@monaco-editor/react';
import { useCallback, useEffect } from 'react';
import { useSettingsStore } from '../../store/settingsStore';
import { useColorMode } from '@chakra-ui/react';
import { useEditorStore } from '../../store/editorStore';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
}

const CodeEditor = ({ value, onChange, language }: CodeEditorProps) => {
  const { editor, theme } = useSettingsStore();
  const { colorMode } = useColorMode();
  const { code, setCode } = useEditorStore();

  const editorTheme = colorMode === 'dark' ? 'vs-dark' : 'vs-light';

  const editorOptions: EditorProps['options'] = {
    minimap: { enabled: editor.showMinimap },
    fontSize: theme.fontSize,
    fontFamily: editor.fontFamily,
    fontLigatures: editor.fontFamily.includes('Fira Code'),
    tabSize: editor.tabSize,
    wordWrap: editor.lineWrapping ? 'on' : 'off',
    lineNumbers: editor.showLineNumbers ? 'on' : 'off',
    roundedSelection: true,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    padding: { top: 8 },
    fontWeight: '400',
  };

  const handleEditorChange = useCallback(
    (value: string | undefined) => {
      onChange(value || '');
    },
    [onChange]
  );

  useEffect(() => {
    if (value !== code) {
      onChange(code);
    }
  }, [code]);

  return (
    <Box h="100%" borderRadius="md" overflow="hidden" position="relative">
      <Editor
        height="100%"
        defaultLanguage={language}
        value={value}
        onChange={handleEditorChange}
        theme={editorTheme}
        options={editorOptions}
      />
    </Box>
  );
};

export default CodeEditor; 