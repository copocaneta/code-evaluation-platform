import { Box, Flex, Heading, Container, IconButton, useDisclosure } from '@chakra-ui/react';
import { FiSettings } from 'react-icons/fi';
import ChallengeTabs from './navigation/ChallengeTabs';
import { SettingsModal } from './settings/SettingsModal';

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      left={0}
      right={0}
      height="64px"
      bg="white"
      boxShadow="sm"
      zIndex={10}
    >
      <Container maxW="container.xl" height="100%">
        <Flex height="100%" align="center" justify="space-between" gap="4">
          <Heading
            size="md"
            color="brand.500"
            flexShrink={0}
            cursor="pointer"
            _hover={{ color: 'brand.600' }}
            transition="color 0.2s"
          >
            {process.env.NEXT_PUBLIC_APP_NAME}
          </Heading>

          <Box flex="1" display={{ base: 'none', md: 'block' }}>
            <ChallengeTabs />
          </Box>

          <IconButton
            aria-label="Settings"
            icon={<FiSettings />}
            variant="ghost"
            onClick={onOpen}
          />
        </Flex>
      </Container>

      <SettingsModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default Header; 