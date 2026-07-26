import {
  defineNavigationMenuItem,
  NavigationMenuItemType,
} from 'twenty-sdk/define';

import {
  COMMAND_CENTER_NAVIGATION_UNIVERSAL_IDENTIFIER,
  TASK_BOARD_VIEW_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: '6ab8db30-ae18-47b5-9bfb-6b6931b7dde5',
  name: 'Agent Task Board',
  icon: 'IconLayoutKanban',
  color: 'green',
  position: 4,
  type: NavigationMenuItemType.VIEW,
  folderUniversalIdentifier:
    COMMAND_CENTER_NAVIGATION_UNIVERSAL_IDENTIFIER,
  viewUniversalIdentifier: TASK_BOARD_VIEW_UNIVERSAL_IDENTIFIER,
});
