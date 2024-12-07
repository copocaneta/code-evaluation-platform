import { Box, Grid, useBreakpointValue, useColorMode } from '@chakra-ui/react';
import CodeInputPanel from '../components/editor/CodeInputPanel';
import EvaluationPanel from '../components/evaluation/EvaluationPanel';

export default function Home() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { colorMode } = useColorMode();

  return (
    <Grid
      templateColumns={{ base: '1fr', md: '6fr 4fr' }}
      gap="base"
      minH="calc(90vh - 64px)"
    >
      <Box
        bg={colorMode === 'dark' ? 'gray.700' : 'white'}
        p="base"
        borderRadius="md"
        boxShadow="sm"
        height={isMobile ? 'calc(50vh - 32px)' : '100%'}
        overflow="hidden"
      >
        <CodeInputPanel />
      </Box>
      <Box
        bg={colorMode === 'dark' ? 'gray.700' : 'white'}
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