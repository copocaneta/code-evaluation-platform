import { Box, VStack, HStack, useDisclosure, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Button, useToast } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import CodeEditor from './CodeEditor';
import LanguageSelector from './LanguageSelector';
import EditorActions from './EditorActions';
import { useEditorStore } from '../../store/editorStore';
import { useChallengeStore } from '../../store/challengeStore';
import { useEvaluationStore } from '../../store/evaluationStore';
import { EvaluationService } from '../../services/evaluation';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';
import LoadingSpinner from '../ui/LoadingSpinner';

const CodeInputPanel = () => {
  const { code, language, setCode, setLanguage, clearEditor } = useEditorStore();
  const { activeChallenge } = useChallengeStore();
  const { addResult, setLoading, setError } = useEvaluationStore();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const toast = useToast();

  useKeyboardShortcuts();

  const handleEvaluate = async () => {
    setIsLoading(true);
    setLoading(true);
    try {
      const result = await EvaluationService.evaluate(code, language);
      addResult(result);

      if (result.status === 'error') {
        toast({
          title: 'Evaluation Failed',
          description: result.content,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Evaluation failed');
      toast({
        title: 'Error',
        description: 'Failed to evaluate code',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  };

  const handleClear = () => {
    onOpen();
  };

  const confirmClear = () => {
    clearEditor();
    onClose();
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
  };

  return (
    <VStack height="100%" spacing={4} p={4}>
      <HStack width="100%" justify="space-between">
        <LanguageSelector value={language} onChange={setLanguage} />
        <HStack>
          <EditorActions
            onClear={handleClear}
            onCopy={handleCopy}
          />
          <Button
            colorScheme="brand"
            onClick={handleEvaluate}
            leftIcon={isLoading ? <LoadingSpinner size="sm" /> : undefined}
            _hover={{ transform: 'translateY(-1px)' }}
            _active={{ transform: 'translateY(0)' }}
          >
            Evaluate
          </Button>
        </HStack>
      </HStack>

      <Box flex="1" width="100%">
        <CodeEditor
          value={code}
          onChange={setCode}
          language={language}
        />
      </Box>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Clear Editor</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to clear the editor? This action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={confirmClear} ml={3}>
                Clear
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </VStack>
  );
};

export default CodeInputPanel; 