import { Box, Flex, Heading, IconButton, useDisclosure, useColorMode } from '@chakra-ui/react';
import { FiSettings, FiMenu } from 'react-icons/fi';
import ChallengeTabs from './navigation/ChallengeTabs';
import { SettingsModal } from './settings/SettingsModal';
import MobileNavigation from './navigation/MobileNavigation';
import { useBreakpointValue } from '@chakra-ui/react';

const Header = () => {
  const { isOpen: isSettingsOpen, onOpen: onSettingsOpen, onClose: onSettingsClose } = useDisclosure();
  const { isOpen: isNavOpen, onOpen: onNavOpen, onClose: onNavClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      left={0}
      right={0}
      height="64px"
      bg={colorMode === 'dark' ? 'gray.700' : 'white'}
      boxShadow="sm"
      zIndex={10}
      px="32px"
    >
      <Flex height="100%" align="center" justify="space-between" gap="4">
        {isMobile && (
          <IconButton
            aria-label="Open navigation"
            icon={<FiMenu />}
            variant="ghost"
            onClick={onNavOpen}
            color={colorMode === 'dark' ? 'gray.200' : 'gray.600'}
            _hover={{
              bg: colorMode === 'dark' ? 'whiteAlpha.200' : 'gray.100',
              color: colorMode === 'dark' ? 'white' : 'gray.800',
            }}
          />
        )}
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
          onClick={onSettingsOpen}
          color={colorMode === 'dark' ? 'gray.200' : 'gray.600'}
          _hover={{
            bg: colorMode === 'dark' ? 'whiteAlpha.200' : 'gray.100',
            color: colorMode === 'dark' ? 'white' : 'gray.800',
          }}
        />
      </Flex>

      <SettingsModal isOpen={isSettingsOpen} onClose={onSettingsClose} />
      <MobileNavigation isOpen={isNavOpen} onClose={onNavClose} />
    </Box>
  );
};

export default Header; 