import { Grid, GridItem, useBreakpointValue, useColorMode } from '@chakra-ui/react';
import CodeInputPanel from '../components/editor/CodeInputPanel';
import EvaluationPanel from '../components/evaluation/EvaluationPanel';
import ChallengeView from '../components/challenge/ChallengeView';

export default function Home() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { colorMode } = useColorMode();

  const bgColor = colorMode === 'dark' ? 'gray.700' : 'white';
  const borderColor = colorMode === 'dark' ? 'gray.600' : 'gray.200';

  return (
    <Grid
      templateRows="auto 1fr"
      templateColumns={{ base: '1fr', md: '2fr 3fr' }}
      gap="base"
      p="base"
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