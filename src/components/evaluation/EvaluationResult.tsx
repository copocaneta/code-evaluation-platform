import { Box, Text, Badge, Flex } from '@chakra-ui/react';
import MarkdownRenderer from './MarkdownRenderer';

interface EvaluationResultProps {
  timestamp: string;
  status: 'success' | 'error' | 'warning';
  content: string;
}

const EvaluationResult = ({ timestamp, status, content }: EvaluationResultProps) => {
  const statusColors = {
    success: 'green',
    error: 'red',
    warning: 'orange',
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      p={4}
      mb={4}
      bg="white"
    >
      <Flex justify="space-between" align="center" mb={4}>
        <Badge colorScheme={statusColors[status]}>
          {status.toUpperCase()}
        </Badge>
        <Text fontSize="sm" color="gray.500">
          {new Date(timestamp).toLocaleString()}
        </Text>
      </Flex>
      <MarkdownRenderer content={content} />
    </Box>
  );
};

export default EvaluationResult; 