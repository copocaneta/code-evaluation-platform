import { useToast as useChakraToast, UseToastOptions } from '@chakra-ui/react';

const defaultOptions: UseToastOptions = {
  duration: 3000,
  isClosable: true,
  position: 'top-right',
  variant: 'subtle',
};

export const useToast = () => {
  const toast = useChakraToast();

  const showToast = (options: UseToastOptions) => {
    toast({
      ...defaultOptions,
      ...options,
    });
  };

  return {
    success: (title: string, description?: string) =>
      showToast({ title, description, status: 'success' }),
    error: (title: string, description?: string) =>
      showToast({ title, description, status: 'error' }),
    warning: (title: string, description?: string) =>
      showToast({ title, description, status: 'warning' }),
    info: (title: string, description?: string) =>
      showToast({ title, description, status: 'info' }),
  };
}; 