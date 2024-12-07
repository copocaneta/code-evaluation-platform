import { Box, Text, Badge, Flex, useColorMode } from '@chakra-ui/react';
import MarkdownRenderer from './MarkdownRenderer';

interface EvaluationResultProps {
  timestamp: string;
  status: 'success' | 'error' | 'warning';
  content: string;
}

const EvaluationResult = ({ timestamp, status, content }: EvaluationResultProps) => {
  const { colorMode } = useColorMode();
  
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
      bg={colorMode === 'dark' ? 'gray.700' : 'white'}
      borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
    >
      <Flex justify="space-between" align="center" mb={4}>
        <Badge colorScheme={statusColors[status]}>
          {status.toUpperCase()}
        </Badge>
        <Text fontSize="sm" color={colorMode === 'dark' ? 'gray.400' : 'gray.500'}>
          {new Date(timestamp).toLocaleString()}
        </Text>
      </Flex>
      <Box color={colorMode === 'dark' ? 'gray.100' : 'gray.800'} px={2}>
        <MarkdownRenderer content={content} />
      </Box>
    </Box>
  );
};

export default EvaluationResult; 