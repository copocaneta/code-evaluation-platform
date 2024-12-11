import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { SignIn } from "@clerk/nextjs";
import { useClerk } from '@clerk/nextjs';
import Header from '../Header';
import { useChallengeStore } from '../../store/challengeStore';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const loadChallenges = useChallengeStore((state) => state.loadChallenges);
  const { session } = useClerk();

  useEffect(() => {
    loadChallenges();
  }, [loadChallenges]);

  if (!session) {
    return (
      <Box 
        minH="100vh" 
        display="flex" 
        alignItems="center" 
        justifyContent="center"
        bg="gray.50"
        _dark={{ bg: 'gray.900' }}
      >
        <SignIn 
          routing="hash"
          appearance={{
            elements: {
              formButtonPrimary: {
                backgroundColor: 'var(--chakra-colors-brand-500)',
                '&:hover': {
                  backgroundColor: 'var(--chakra-colors-brand-600)'
                }
              }
            }
          }}
        />
      </Box>
    );
  }

  return (
    <Box minH="100vh" pt="64px">
      <Header />
      <Box p="base">{children}</Box>
    </Box>
  );
};

export default MainLayout; 