import { Box, Text, useColorMode } from '@chakra-ui/react';
import { useChallengeStore } from '../../store/challengeStore';
import { useEditorStore } from '../../store/editorStore';
import { useEffect } from 'react';
import MarkdownRenderer from '../evaluation/MarkdownRenderer';

const ChallengeView = () => {
  const { activeChallenge } = useChallengeStore();
  const { setCode, setLanguage } = useEditorStore();
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (activeChallenge) {
      console.log('Setting initial code for challenge:', activeChallenge.id);
      setCode(activeChallenge.initialCode);
      setLanguage(activeChallenge.defaultLanguage);
    }
  }, [activeChallenge?.id]);

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
    </Box>
  );
};

export default ChallengeView; 