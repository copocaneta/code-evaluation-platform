import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Box } from '@chakra-ui/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { CSSProperties } from 'react';

interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const MarkdownRenderer = ({ content }: { content: string }) => {
  const components = {
    code({ inline, className, children, ...props }: CodeProps) {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : '';
      const path = className?.split(':')[1];

      return !inline ? (
        <Box mb={4}>
          {path && (
            <Box
              fontSize="sm"
              color="gray.600"
              mb={2}
              fontFamily="mono"
            >
              {path}
            </Box>
          )}
          <SyntaxHighlighter
            language={language}
            style={vs as { [key: string]: CSSProperties }}
            customStyle={{
              margin: 0,
              borderRadius: '6px',
            }}
            {...props}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </Box>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
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