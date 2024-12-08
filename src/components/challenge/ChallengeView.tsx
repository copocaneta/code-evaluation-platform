import { Box, Flex, Heading, Text, useColorMode } from '@chakra-ui/react';
import { useChallengeStore } from '../../store/challengeStore';

const ChallengeView = () => {
  const { activeChallenge } = useChallengeStore();
  const { colorMode } = useColorMode();

  if (!activeChallenge) {
    return null;
  }

  return (
    <Box p={4}>
      <Flex align="center" gap={3} mb={2}>
        <Heading size="md" color={colorMode === 'dark' ? 'white' : 'gray.800'}>
          {activeChallenge.title}
        </Heading>
      </Flex>
      <Text color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}>
        {activeChallenge.description}
      </Text>
    </Box>
  );
};

export default ChallengeView; 