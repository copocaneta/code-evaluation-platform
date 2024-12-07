import { Box, Grid, useBreakpointValue } from '@chakra-ui/react';
import CodeInputPanel from '../components/editor/CodeInputPanel';
import EvaluationPanel from '../components/evaluation/EvaluationPanel';

export default function Home() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Grid
      templateColumns={{ base: '1fr', md: '6fr 4fr' }}
      gap="base"
      minH="calc(90vh - 64px)"
    >
      <Box
        bg="white"
        p="base"
        borderRadius="md"
        boxShadow="sm"
        height={isMobile ? 'calc(50vh - 32px)' : '100%'}
        overflow="hidden"
      >
        <CodeInputPanel />
      </Box>
      <Box
        bg="white"
        p="base"
        borderRadius="md"
        boxShadow="sm"
        height={isMobile ? 'calc(50vh - 32px)' : '100%'}
        overflow="hidden"
      >
        <EvaluationPanel />
      </Box>
    </Grid>
  );
} 