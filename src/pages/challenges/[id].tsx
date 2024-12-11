import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Grid, GridItem, useBreakpointValue, useColorMode, Center, Spinner } from '@chakra-ui/react';
import CodeInputPanel from '../../components/editor/CodeInputPanel';
import EvaluationPanel from '../../components/evaluation/EvaluationPanel';
import ChallengeView from '../../components/challenge/ChallengeView';
import { useChallengeStore } from '../../store/challengeStore';

export default function ChallengePage() {
  const router = useRouter();
  const { id } = router.query;
  const { setActiveChallenge, loadChallenges, challenges, isLoading } = useChallengeStore();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (challenges.length === 0) {
      loadChallenges();
    }
  }, [challenges.length, loadChallenges]);

  useEffect(() => {
    if (id && typeof id === 'string' && !isLoading) {
      const challenge = challenges.find(c => c.id === id);
      if (!challenge) {
        router.replace('/challenges');
        return;
      }
      setActiveChallenge(id);
    }
  }, [id, setActiveChallenge, challenges, isLoading, router]);

  if (isLoading || !id) {
    return (
      <Center h="calc(100vh - 64px)">
        <Spinner size="xl" color="brand.500" />
      </Center>
    );
  }

  const bgColor = colorMode === 'dark' ? 'gray.700' : 'white';
  const borderColor = colorMode === 'dark' ? 'gray.600' : 'gray.200';

  return (
    <Grid
      templateRows="auto 1fr"
      templateColumns={{ base: '1fr', md: '2fr 3fr' }}
      gap="4"
      p="4"
      minH="calc(100vh - 64px)"
    >
      <GridItem
        colSpan={{ base: 1, md: 2 }}
        bg={bgColor}
        borderRadius="md"
        borderWidth="1px"
        borderColor={borderColor}
        overflow="auto"
      >
        <ChallengeView />
      </GridItem>

      <GridItem
        bg={bgColor}
        borderRadius="md"
        borderWidth="1px"
        borderColor={borderColor}
        height={isMobile ? 'calc(50vh - 32px)' : '100%'}
        overflow="hidden"
      >
        <CodeInputPanel />
      </GridItem>

      <GridItem
        bg={bgColor}
        borderRadius="md"
        borderWidth="1px"
        borderColor={borderColor}
        height={isMobile ? 'calc(50vh - 32px)' : '100%'}
        overflow="auto"
      >
        <EvaluationPanel />
      </GridItem>
    </Grid>
  );
} 