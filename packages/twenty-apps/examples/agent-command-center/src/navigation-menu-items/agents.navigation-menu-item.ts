import {
  defineNavigationMenuItem,
  NavigationMenuItemType,
} from 'twenty-sdk/define';

import {
  AGENTS_VIEW_UNIVERSAL_IDENTIFIER,
  COMMAND_CENTER_NAVIGATION_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: '8f4acbfe-a17e-4c1e-9eed-f4994d649c10',
  name: 'Agent Roster',
  icon: 'IconRobot',
  color: 'purple',
  position: 3,
  type: NavigationMenuItemType.VIEW,
  folderUniversalIdentifier:
    COMMAND_CENTER_NAVIGATION_UNIVERSAL_IDENTIFIER,
  viewUniversalIdentifier: AGENTS_VIEW_UNIVERSAL_IDENTIFIER,
});
