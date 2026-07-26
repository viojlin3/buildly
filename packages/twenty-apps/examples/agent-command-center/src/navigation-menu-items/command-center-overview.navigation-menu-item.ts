import {
  defineNavigationMenuItem,
  NavigationMenuItemType,
} from 'twenty-sdk/define';

import {
  COMMAND_CENTER_NAVIGATION_UNIVERSAL_IDENTIFIER,
  COMMAND_CENTER_OVERVIEW_NAVIGATION_UNIVERSAL_IDENTIFIER,
  COMMAND_CENTER_PAGE_LAYOUT_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineNavigationMenuItem({
  universalIdentifier:
    COMMAND_CENTER_OVERVIEW_NAVIGATION_UNIVERSAL_IDENTIFIER,
  name: 'Overview',
  icon: 'IconActivityHeartbeat',
  color: 'blue',
  position: 0,
  type: NavigationMenuItemType.PAGE_LAYOUT,
  folderUniversalIdentifier:
    COMMAND_CENTER_NAVIGATION_UNIVERSAL_IDENTIFIER,
  pageLayoutUniversalIdentifier:
    COMMAND_CENTER_PAGE_LAYOUT_UNIVERSAL_IDENTIFIER,
});
