import { Spinner, SpinnerProps, Box } from '@chakra-ui/react';

interface LoadingSpinnerProps extends SpinnerProps {
  fullscreen?: boolean;
}

const LoadingSpinner = ({ fullscreen, ...props }: LoadingSpinnerProps) => {
  if (fullscreen) {
    return (
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="blackAlpha.300"
        zIndex={9999}
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="brand.500"
          size="xl"
          {...props}
        />
      </Box>
    );
  }

  return (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="brand.500"
      {...props}
    />
  );
};

export default LoadingSpinner; 