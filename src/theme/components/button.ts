import { defineStyleConfig } from '@chakra-ui/react';

export const Button = defineStyleConfig({
  baseStyle: {
    fontWeight: 'semibold',
    borderRadius: 'md',
    _focus: {
      boxShadow: 'outline',
    },
  },
  variants: {
    solid: {
      bg: 'brand.500',
      color: 'white',
      _hover: {
        bg: 'brand.600',
        _disabled: {
          bg: 'brand.500',
        },
      },
      _active: {
        bg: 'brand.700',
      },
    },
    ghost: {
      color: 'gray.600',
      _hover: {
        bg: 'gray.50',
      },
      _active: {
        bg: 'gray.100',
      },
    },
  },
  defaultProps: {
    variant: 'solid',
    size: 'md',
  },
}); 