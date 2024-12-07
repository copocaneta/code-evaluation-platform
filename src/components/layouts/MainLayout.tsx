import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import Header from '../Header';
import { useChallengeStore } from '../../store/challengeStore';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const loadChallenges = useChallengeStore((state) => state.loadChallenges);

  useEffect(() => {
    loadChallenges();
  }, [loadChallenges]);

  return (
    <Box minH="100vh" pt="64px">
      <Header />
      <Box p="base">{children}</Box>
    </Box>
  );
};

export default MainLayout; 