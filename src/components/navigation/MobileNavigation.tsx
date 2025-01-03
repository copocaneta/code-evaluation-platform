import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Button,
  Text,
  useColorMode,
  Box,
} from '@chakra-ui/react';
import { useChallengeStore } from '../../store/challengeStore';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNavigation = ({ isOpen, onClose }: MobileNavigationProps) => {
  const { challenges, activeChallenge, setActiveChallenge } = useChallengeStore();
  const { colorMode } = useColorMode();

  const handleChallengeSelect = (challengeId: string) => {
    setActiveChallenge(challengeId);
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent bg={colorMode === 'dark' ? 'gray.800' : 'white'}>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">Challenges</DrawerHeader>
        <DrawerBody>
          <VStack spacing="4" align="stretch" pt="4">
            {challenges.map((challenge) => (
              <Box key={challenge.id}>
                <Button
                  variant="ghost"
                  width="100%"
                  justifyContent="flex-start"
                  onClick={() => handleChallengeSelect(challenge.id)}
                  bg={activeChallenge?.id === challenge.id ? (colorMode === 'dark' ? 'whiteAlpha.100' : 'gray.50') : undefined}
                  color={colorMode === 'dark' ? 'white' : 'gray.800'}
                >
                  <Text>{challenge.title}</Text>
                </Button>
                {challenge.description && (
                  <Text
                    fontSize="sm"
                    color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}
                    pl="4"
                    pr="2"
                    mt="1"
                  >
                    {challenge.description}
                  </Text>
                )}
              </Box>
            ))}
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileNavigation; 