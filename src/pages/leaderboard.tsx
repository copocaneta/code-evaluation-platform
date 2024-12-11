import { useEffect, useState } from 'react';
import { Box, VStack, Heading, Text, Avatar, Flex, useColorMode, Spinner, Center } from '@chakra-ui/react';
import type { LeaderboardEntry } from '../services/leaderboardService';
import { useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/router';

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { colorMode } = useColorMode();
  const { session } = useClerk();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/sign-in');
      return;
    }

    const fetchLeaderboard = async () => {
      try {
        const res = await fetch('/api/leaderboard');
        if (!res.ok) throw new Error('Failed to fetch leaderboard');
        const data = await res.json();
        setLeaderboard(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, [session, router]);

  if (isLoading) {
    return (
      <Center h="calc(100vh - 64px)">
        <Spinner size="xl" color="brand.500" />
      </Center>
    );
  }

  return (
    <Box maxW="container.md" mx="auto" py={8} px={4}>
      <Heading mb={6}>Leaderboard</Heading>
      <VStack spacing={4} align="stretch">
        {leaderboard.map((entry, index) => (
          <Flex
            key={entry.userId}
            p={4}
            bg={colorMode === 'dark' ? 'gray.700' : 'white'}
            borderRadius="md"
            boxShadow="sm"
            align="center"
          >
            <Text fontSize="xl" fontWeight="bold" w={8}>
              #{index + 1}
            </Text>
            <Avatar size="sm" src={entry.avatarUrl} name={entry.username} mr={4} />
            <Text flex={1} fontWeight="medium">
              {entry.username}
            </Text>
            <Text fontWeight="bold" color="brand.500">
              {entry.points} points
            </Text>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
} 