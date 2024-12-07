import { VStack, Box, Text, Spinner, Center } from '@chakra-ui/react';
import EvaluationResult from './EvaluationResult';
import { useEvaluationStore } from '../../store/evaluationStore';

const EvaluationPanel = () => {
  const { results, isLoading } = useEvaluationStore();

  return (
    <VStack height="100%" spacing={4} align="stretch">
      <Text fontSize="lg" fontWeight="medium" color="gray.700">
        Evaluation Results
      </Text>

      <Box flex="1" overflowY="auto">
        {isLoading ? (
          <Center height="100%">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="brand.500"
              size="xl"
            />
          </Center>
        ) : results.length > 0 ? (
          results.map((result) => (
            <EvaluationResult
              key={result.id}
              timestamp={result.timestamp}
              status={result.status}
              content={result.content}
            />
          ))
        ) : (
          <Center height="100%">
            <Text color="gray.500">
              No evaluation results yet. Submit your code to see results.
            </Text>
          </Center>
        )}
      </Box>
    </VStack>
  );
};

export default EvaluationPanel; 