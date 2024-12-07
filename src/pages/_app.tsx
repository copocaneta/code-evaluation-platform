import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import theme from '../theme';
import MainLayout from '../components/layouts/MainLayout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ChakraProvider>
  );
} 