import { Box, Text, Badge, Flex, useColorMode } from '@chakra-ui/react';
import MarkdownRenderer from './MarkdownRenderer';

interface EvaluationResultProps {
  timestamp: string;
  status: 'success' | 'error' | 'warning';
  content: string;
}

const EvaluationResult = ({ timestamp, status, content }: EvaluationResultProps) => {
  const { colorMode } = useColorMode();

  const statusConfig = {
    success: { color: 'green', text: 'PASS' },
    error: { color: 'red', text: 'FAIL' },
    warning: { color: 'yellow', text: 'WARNING' },
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      p={4}
      mb={4}
      bg={colorMode === 'dark' ? 'gray.700' : 'white'}
      borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
      width="100%"
      maxWidth="100%"
      overflow="hidden"
      wordBreak="break-word"
    >
      <Flex justify="space-between" align="center" mb={4}>
        <Badge colorScheme={statusConfig[status].color}>
          {statusConfig[status].text}
        </Badge>
        <Text fontSize="sm" color={colorMode === 'dark' ? 'gray.400' : 'gray.500'}>
          {new Date(timestamp).toLocaleString()}
        </Text>
      </Flex>
      <Box 
        color={colorMode === 'dark' ? 'gray.100' : 'gray.800'} 
        px={2}
        sx={{
          '& > div': {
            width: '100%',
            maxWidth: '100%',
            overflow: 'hidden',
            wordWrap: 'break-word',
          },
          '& pre': {
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            maxWidth: '100%',
          },
          '& code': {
            wordBreak: 'break-all',
            whiteSpace: 'pre-wrap',
          }
        }}
      >
        <MarkdownRenderer content={content} />
      </Box>
    </Box>
  );
};

export default EvaluationResult; 