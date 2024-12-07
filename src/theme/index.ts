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
      50: '#E5F0FF',
      100: '#B8D5FF',
      200: '#8ABBFF',
      300: '#5CA1FF',
      400: '#2E87FF',
      500: '#006DFF',
      600: '#0057CC',
      700: '#004199',
      800: '#002B66',
      900: '#001533',
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