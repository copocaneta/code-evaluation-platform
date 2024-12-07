import { Box, Flex, Heading, useColorModeValue } from '@chakra-ui/react';

const Header = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      left={0}
      right={0}
      height="64px"
      borderBottom="1px"
      borderColor={borderColor}
      bg={bgColor}
      zIndex={1000}
    >
      <Flex
        maxW="container.xl"
        mx="auto"
        px={4}
        height="100%"
        align="center"
        justify="space-between"
      >
        <Heading size="md" color="brand.500">
          {process.env.NEXT_PUBLIC_APP_NAME}
        </Heading>
      </Flex>
    </Box>
  );
};

export default Header; 