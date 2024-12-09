import { Box, Text, useColorMode } from '@chakra-ui/react';
import { useChallengeStore } from '../../store/challengeStore';
import MarkdownRenderer from '../evaluation/MarkdownRenderer';

const ChallengeView = () => {
  const { activeChallenge } = useChallengeStore();
  const { colorMode } = useColorMode();

  if (!activeChallenge) {
    return (
      <Box p={4}>
        <Text>Please select a challenge to begin.</Text>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Box>
        <Text fontSize="md" fontWeight="semibold" mb={1}>
          {activeChallenge.title}
        </Text>
        <Text 
          color={colorMode === 'dark' ? 'gray.300' : 'gray.600'}
          noOfLines={1}
          fontSize="sm"
        >
          {activeChallenge.description}
        </Text>
      </Box>
      <Box mt={3}>
        <MarkdownRenderer content={activeChallenge.instructions} />
      </Box>
    </Box>
  );
};

export default ChallengeView; 