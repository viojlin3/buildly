import {
  defineNavigationMenuItem,
  NavigationMenuItemType,
} from 'twenty-sdk/define';

import {
  COMMAND_CENTER_NAVIGATION_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: COMMAND_CENTER_NAVIGATION_UNIVERSAL_IDENTIFIER,
  name: 'Agent Command Center',
  icon: 'IconActivityHeartbeat',
  color: 'blue',
  position: 0,
  type: NavigationMenuItemType.FOLDER,
});
