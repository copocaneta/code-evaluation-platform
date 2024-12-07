import { Button, HStack, useToast } from '@chakra-ui/react';
import { FiCopy, FiTrash2 } from 'react-icons/fi';

interface EditorActionsProps {
  onClear: () => void;
  onCopy: () => void;
  isLoading?: boolean;
}

const EditorActions = ({ onClear, onCopy, isLoading }: EditorActionsProps) => {
  const toast = useToast();

  const handleCopy = async () => {
    try {
      await onCopy();
      toast({
        title: 'Code copied to clipboard',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Failed to copy code',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <HStack spacing={2}>
      <Button
        leftIcon={<FiCopy />}
        variant="ghost"
        size="sm"
        onClick={handleCopy}
        isLoading={isLoading}
      >
        Copy
      </Button>
      <Button
        leftIcon={<FiTrash2 />}
        variant="ghost"
        size="sm"
        onClick={onClear}
        isLoading={isLoading}
        colorScheme="red"
      >
        Clear
      </Button>
    </HStack>
  );
};

export default EditorActions; 