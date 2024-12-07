import { Flex, Button, useColorMode } from '@chakra-ui/react';
import { useState } from 'react';

const challenges = [
  { id: 'basic', label: 'Basic' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
];

const ChallengeTabs = () => {
  const [activeTab, setActiveTab] = useState('basic');
  const { colorMode } = useColorMode();

  return (
    <Flex gap="2" overflowX="auto" py="2">
      {challenges.map((challenge) => (
        <Button
          key={challenge.id}
          variant="ghost"
          size="md"
          px="6"
          color={
            activeTab === challenge.id
              ? 'brand.500'
              : colorMode === 'dark'
              ? 'gray.200'
              : 'gray.600'
          }
          borderBottom="2px"
          borderColor={activeTab === challenge.id ? 'brand.500' : 'transparent'}
          borderRadius="0"
          _hover={{
            bg: colorMode === 'dark' ? 'whiteAlpha.200' : 'gray.100',
            color: colorMode === 'dark' ? 'white' : 'gray.800',
          }}
          onClick={() => setActiveTab(challenge.id)}
        >
          {challenge.label}
        </Button>
      ))}
    </Flex>
  );
};

export default ChallengeTabs; 