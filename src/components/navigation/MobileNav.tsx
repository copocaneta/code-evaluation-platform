import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';

const MobileNav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        display={{ base: 'flex', md: 'none' }}
        variant="ghost"
        onClick={onOpen}
        leftIcon={<FiMenu />}
      >
        Menu
      </Button>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Challenges</DrawerHeader>
          <DrawerBody>
            <VStack align="stretch" spacing="2" pt="4">
              <Button variant="ghost">Basic</Button>
              <Button variant="ghost">Intermediate</Button>
              <Button variant="ghost">Advanced</Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileNav; 