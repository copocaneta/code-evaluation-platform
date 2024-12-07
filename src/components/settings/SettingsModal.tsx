import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  HStack,
  Text,
  Select,
  Switch,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  useColorMode,
} from '@chakra-ui/react';
import { useSettingsStore } from '../../store/settingsStore';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const { theme, editor, setTheme, setEditor, resetSettings } = useSettingsStore();
  const { setColorMode } = useColorMode();

  const handleColorModeChange = (mode: 'light' | 'dark' | 'system') => {
    setTheme({ colorMode: mode });
    setColorMode(mode === 'system' ? 'light' : mode);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Tabs>
            <TabList>
              <Tab>Theme</Tab>
              <Tab>Editor</Tab>
              <Tab>Shortcuts</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <VStack spacing={4} align="stretch">
                  <HStack justify="space-between">
                    <Text>Color Mode</Text>
                    <Select
                      value={theme.colorMode}
                      onChange={(e) => handleColorModeChange(e.target.value as any)}
                      width="200px"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System</option>
                    </Select>
                  </HStack>

                  <HStack justify="space-between">
                    <Text>Color Scheme</Text>
                    <Select
                      value={theme.colorScheme}
                      onChange={(e) => setTheme({ colorScheme: e.target.value as any })}
                      width="200px"
                    >
                      <option value="default">Default</option>
                      <option value="high-contrast">High Contrast</option>
                      <option value="custom">Custom</option>
                    </Select>
                  </HStack>

                  <HStack justify="space-between">
                    <Text>Font Size</Text>
                    <NumberInput
                      value={theme.fontSize}
                      onChange={(_, value) => setTheme({ fontSize: value })}
                      min={12}
                      max={24}
                      width="200px"
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </HStack>
                </VStack>
              </TabPanel>

              <TabPanel>
                <VStack spacing={4} align="stretch">
                  <HStack justify="space-between">
                    <Text>Font Family</Text>
                    <Select
                      value={editor.fontFamily}
                      onChange={(e) => setEditor({ fontFamily: e.target.value })}
                      width="200px"
                    >
                      <option value="Monaco, monospace">Monaco</option>
                      <option value="Consolas, monospace">Consolas</option>
                      <option value="Fira Code, monospace">Fira Code</option>
                    </Select>
                  </HStack>

                  <HStack justify="space-between">
                    <Text>Tab Size</Text>
                    <NumberInput
                      value={editor.tabSize}
                      onChange={(_, value) => setEditor({ tabSize: value })}
                      min={2}
                      max={8}
                      width="200px"
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </HStack>

                  <HStack justify="space-between">
                    <Text>Line Wrapping</Text>
                    <Switch
                      isChecked={editor.lineWrapping}
                      onChange={(e) => setEditor({ lineWrapping: e.target.checked })}
                    />
                  </HStack>

                  <HStack justify="space-between">
                    <Text>Show Line Numbers</Text>
                    <Switch
                      isChecked={editor.showLineNumbers}
                      onChange={(e) => setEditor({ showLineNumbers: e.target.checked })}
                    />
                  </HStack>

                  <HStack justify="space-between">
                    <Text>Show Minimap</Text>
                    <Switch
                      isChecked={editor.showMinimap}
                      onChange={(e) => setEditor({ showMinimap: e.target.checked })}
                    />
                  </HStack>
                </VStack>
              </TabPanel>

              <TabPanel>
                <VStack spacing={4} align="stretch">
                  <Text fontWeight="medium">Keyboard Shortcuts</Text>
                  <HStack>
                    <Text fontFamily="mono">Ctrl/⌘ + S</Text>
                    <Text color="gray.600">Save changes</Text>
                  </HStack>
                  <HStack>
                    <Text fontFamily="mono">Ctrl/⌘ + K</Text>
                    <Text color="gray.600">Clear editor</Text>
                  </HStack>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>

          <HStack justify="flex-end" mt={6}>
            <Button variant="ghost" onClick={resetSettings}>
              Reset to Defaults
            </Button>
            <Button colorScheme="brand" onClick={onClose}>
              Close
            </Button>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}; 