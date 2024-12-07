import { Box, Container } from '@chakra-ui/react';
import Header from './Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Box minH="100vh">
      <Header />
      <Box as="main" minH="90vh" pt="64px">
        <Container maxW="container.xl" px={4}>
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout; 