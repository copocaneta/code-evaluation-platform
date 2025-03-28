import { Box, Flex, Heading, IconButton, Button, useDisclosure, useColorMode } from '@chakra-ui/react';
import { FiSettings, FiMenu, FiAward, FiCode } from 'react-icons/fi';
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs';
import ChallengeTabs from './navigation/ChallengeTabs';
import { SettingsModal } from './settings/SettingsModal';
import MobileNavigation from './navigation/MobileNavigation';
import { useBreakpointValue } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header = () => {
  const { isOpen: isSettingsOpen, onOpen: onSettingsOpen, onClose: onSettingsClose } = useDisclosure();
  const { isOpen: isNavOpen, onOpen: onNavOpen, onClose: onNavClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const router = useRouter();
  const isChallengePage = router.pathname.startsWith('/challenges');

  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      left={0}
      right={0}
      height="64px"
      borderBottom="1px"
      borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
      bg={colorMode === 'dark' ? 'gray.800' : 'white'}
      zIndex={1000}
    >
      <Flex px={4} h="100%" align="center" justify="space-between">
        <Flex align="center">
          {isMobile && (
            <IconButton
              aria-label="Open navigation"
              icon={<FiMenu />}
              variant="ghost"
              onClick={onNavOpen}
              mr={2}
            />
          )}
          <Link href="/">
            <Heading 
              fontSize={{ base: "14px", sm: "16px", md: "20px" }}
              color="brand.500"
            >
              {process.env.NEXT_PUBLIC_APP_NAME}
            </Heading>
          </Link>
        </Flex>

        {!isMobile && isChallengePage && <ChallengeTabs />}

        <Flex align="center" gap={2}>
          <Link href="/challenges">
            <IconButton
              aria-label="Challenges"
              icon={<FiCode />}
              variant="ghost"
              color={router.pathname.startsWith('/challenges') ? 'brand.500' : undefined}
            />
          </Link>
          <Link href="/leaderboard">
            <IconButton
              aria-label="Leaderboard"
              icon={<FiAward />}
              variant="ghost"
              color={router.pathname === '/leaderboard' ? 'brand.500' : undefined}
            />
          </Link>
          <IconButton
            aria-label="Settings"
            icon={<FiSettings />}
            variant="ghost"
            onClick={onSettingsOpen}
          />
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button colorScheme="brand" size="sm">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
        </Flex>
      </Flex>

      <MobileNavigation isOpen={isNavOpen} onClose={onNavClose} />
      <SettingsModal isOpen={isSettingsOpen} onClose={onSettingsClose} />
    </Box>
  );
};

export default Header; 