import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useClerk } from '@clerk/nextjs';
import { useChallengeStore } from '../store/challengeStore';
import { Center, Spinner } from '@chakra-ui/react';

export default function Home() {
  const router = useRouter();
  const { session } = useClerk();
  const { challenges, loadChallenges, isLoading } = useChallengeStore();

  useEffect(() => {
    if (session) {
      loadChallenges();
    }
  }, [session, loadChallenges]);

  useEffect(() => {
    if (session && !isLoading && challenges.length > 0) {
      router.push('/challenges');
    }
  }, [session, challenges, isLoading, router]);

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="brand.500" />
      </Center>
    );
  }

  return null;
} 