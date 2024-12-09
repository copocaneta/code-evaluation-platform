import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import { Button } from './components/button';

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.50',
        color: props.colorMode === 'dark' ? 'gray.100' : 'gray.800',
      },
      '*': {
        transition: 'all 0.2s ease-in-out',
      },
    }),
  },
  colors: {
    brand: {
      50: '#ffe5e5',
      100: '#ffb8b8',
      200: '#ff8a8a',
      300: '#ff5c5c',
      400: '#ff2e2e',
      500: '#cc0000',
      600: '#a30000',
      700: '#7a0000',
      800: '#520000',
      900: '#290000',
    },
  },
  space: {
    base: '16px',
  },
  components: {
    Button,
    Container: {
      baseStyle: {
        maxW: 'container.xl',
      },
    },
    Modal: {
      baseStyle: (props: any) => ({
        dialog: {
          bg: props.colorMode === 'dark' ? 'gray.700' : 'white',
        },
      }),
    },
  },
});

export default theme; 