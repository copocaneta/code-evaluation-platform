import { Flex, Button, Box } from '@chakra-ui/react';
import { useState } from 'react';

const challenges = [
  { id: 'basic', label: 'Basic' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
];

const ChallengeTabs = () => {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <Flex gap="2" overflowX="auto" py="2">
      {challenges.map((challenge) => (
        <Button
          key={challenge.id}
          variant="ghost"
          size="md"
          px="6"
          color={activeTab === challenge.id ? 'brand.500' : 'gray.600'}
          borderBottom="2px"
          borderColor={activeTab === challenge.id ? 'brand.500' : 'transparent'}
          borderRadius="0"
          _hover={{
            bg: 'gray.50',
            color: 'brand.500',
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