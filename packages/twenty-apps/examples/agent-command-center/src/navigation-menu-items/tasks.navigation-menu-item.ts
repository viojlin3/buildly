import {
  defineNavigationMenuItem,
  NavigationMenuItemType,
} from 'twenty-sdk/define';

import { TASK_BOARD_VIEW_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: '6ab8db30-ae18-47b5-9bfb-6b6931b7dde5',
  name: 'Agent Tasks',
  icon: 'IconLayoutKanban',
  color: 'green',
  position: 3,
  type: NavigationMenuItemType.VIEW,
  viewUniversalIdentifier: TASK_BOARD_VIEW_UNIVERSAL_IDENTIFIER,
});

