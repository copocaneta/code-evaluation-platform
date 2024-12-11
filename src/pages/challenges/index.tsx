import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useChallengeStore } from '../../store/challengeStore';
import { Center, Spinner } from '@chakra-ui/react';

export default function ChallengesPage() {
  const router = useRouter();
  const { challenges, loadChallenges, isLoading } = useChallengeStore();

  useEffect(() => {
    if (challenges.length === 0) {
      loadChallenges();
    }
  }, [challenges.length, loadChallenges]);

  useEffect(() => {
    if (!isLoading && challenges.length > 0) {
      router.replace(`/challenges/${challenges[0].id}`);
    }
  }, [challenges, isLoading, router]);

  return (
    <Center h="calc(100vh - 64px)">
      <Spinner size="xl" color="brand.500" />
    </Center>
  );
} 