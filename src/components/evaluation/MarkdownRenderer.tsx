import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Box, useColorMode } from '@chakra-ui/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs, vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { CSSProperties } from 'react';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  const { colorMode } = useColorMode();

  return (
    <Box className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            const path = className?.split(':')[1];

            return !inline ? (
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
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              </Box>
            ) : (
              <code
                className={className}
                style={{
                  background: colorMode === 'dark' ? '#2D3748' : '#EDF2F7',
                  padding: '0.2em 0.4em',
                  borderRadius: '3px',
                  fontSize: '0.9em',
                }}
                {...props}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
};

export default MarkdownRenderer; 