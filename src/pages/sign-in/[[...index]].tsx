import { SignIn } from "@clerk/nextjs";
import { Box } from "@chakra-ui/react";

export default function SignInPage() {
  return (
    <Box 
      minH="100vh" 
      display="flex" 
      alignItems="center" 
      justifyContent="center"
      bg="gray.50"
      _dark={{ bg: 'gray.900' }}
    >
      <SignIn 
        routing="hash"
        appearance={{
          elements: {
            formButtonPrimary: {
              backgroundColor: 'var(--chakra-colors-brand-500)',
              '&:hover': {
                backgroundColor: 'var(--chakra-colors-brand-600)'
              }
            }
          }
        }}
      />
    </Box>
  );
} 