import { Flex, Button, useColorMode, Box, Text, useBreakpointValue } from '@chakra-ui/react';
import { useChallengeStore } from '../../store/challengeStore';
import { motion } from 'framer-motion';

const ChallengeTabs = () => {
  const { challenges, activeChallenge, setActiveChallenge } = useChallengeStore();
  const { colorMode } = useColorMode();
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex 
      gap="2" 
      overflowX="auto" 
      py="2"
      css={{
        '&::-webkit-scrollbar': {
          height: '4px',
        },
        '&::-webkit-scrollbar-track': {
          background: colorMode === 'dark' ? '#2D3748' : '#EDF2F7',
        },
        '&::-webkit-scrollbar-thumb': {
          background: colorMode === 'dark' ? '#4A5568' : '#CBD5E0',
          borderRadius: '2px',
        },
      }}
    >
      {challenges.map((challenge) => (
        <Box key={challenge.id} position="relative">
          <Button
            variant="ghost"
            size={isMobile ? 'sm' : 'md'}
            px={isMobile ? '3' : '6'}
            color={
              activeChallenge?.id === challenge.id
                ? 'brand.500'
                : colorMode === 'dark'
                ? 'gray.200'
                : 'gray.600'
            }
            borderRadius="0"
            _hover={{
              bg: colorMode === 'dark' ? 'whiteAlpha.200' : 'gray.100',
              color: colorMode === 'dark' ? 'white' : 'gray.800',
            }}
            _focus={{
              boxShadow: 'none',
              outline: 'none',
            }}
            onClick={() => setActiveChallenge(challenge.id)}
            position="relative"
          >
            <Text>{challenge.title}</Text>
          </Button>
          {activeChallenge?.id === challenge.id && (
            <motion.div
              layoutId="activeTab"
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'var(--chakra-colors-brand-500)',
              }}
              initial={false}
            />
          )}
        </Box>
      ))}
    </Flex>
  );
};

export default ChallengeTabs; 