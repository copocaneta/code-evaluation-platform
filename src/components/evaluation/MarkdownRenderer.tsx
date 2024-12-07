import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Box, useColorMode } from '@chakra-ui/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs, vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  const { colorMode } = useColorMode();

  const components: Components = {
    code: ({ children, className, node, ...props }) => {
      const isInline = !className;
      
      if (isInline) {
        return (
          <code
            style={{
              backgroundColor: colorMode === 'dark' ? '#2D3748' : '#EDF2F7',
              padding: '0.2em 0.4em',
              borderRadius: '3px',
              fontSize: '0.85em',
              fontFamily: 'monospace',
            }}
            {...props}
          >
            {children}
          </code>
        );
      }

      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : '';
      const path = className?.split(':')[1];

      return (
        <Box mb={4}>
          {path && (
            <Box
              fontSize="sm"
              color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}
              mb={2}
              fontFamily="mono"
            >
              {path}
            </Box>
          )}
          <SyntaxHighlighter
            language={language}
            style={colorMode === 'dark' ? vscDarkPlus : vs}
            customStyle={{
              margin: 0,
              borderRadius: '6px',
              background: colorMode === 'dark' ? '#1E1E1E' : '#ffffff',
            }}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </Box>
      );
    }
  };

  return (
    <Box className="markdown-body">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </Box>
  );
};

export default MarkdownRenderer; 