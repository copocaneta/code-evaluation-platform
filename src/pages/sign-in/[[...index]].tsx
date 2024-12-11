import { SignIn } from "@clerk/nextjs";
import { Box, Container } from "@chakra-ui/react";

export default function SignInPage() {
  return (
    <Container maxW="container.sm" py={8}>
      <Box
        p={6}
        bg="white"
        borderRadius="lg"
        boxShadow="sm"
        _dark={{
          bg: "gray.700",
        }}
      >
        <SignIn
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
    </Container>
  );
} 