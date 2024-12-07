import { IconButton, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { FiSettings } from 'react-icons/fi';

const SettingsMenu = () => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Settings"
        icon={<FiSettings />}
        variant="ghost"
        size="md"
        _hover={{ bg: 'gray.50' }}
      />
      <MenuList>
        <MenuItem>Theme Settings</MenuItem>
        <MenuItem>Editor Preferences</MenuItem>
        <MenuItem>Keyboard Shortcuts</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default SettingsMenu; 