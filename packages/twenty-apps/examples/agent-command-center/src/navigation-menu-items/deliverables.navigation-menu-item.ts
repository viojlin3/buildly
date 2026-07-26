import {
  defineNavigationMenuItem,
  NavigationMenuItemType,
} from 'twenty-sdk/define';

import {
  COMMAND_CENTER_NAVIGATION_UNIVERSAL_IDENTIFIER,
  DELIVERABLES_VIEW_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: '3a190ba9-a150-4418-94d9-fec04b47bc79',
  name: 'Agent Deliverables',
  icon: 'IconPackageExport',
  color: 'green',
  position: 5,
  type: NavigationMenuItemType.VIEW,
  folderUniversalIdentifier:
    COMMAND_CENTER_NAVIGATION_UNIVERSAL_IDENTIFIER,
  viewUniversalIdentifier: DELIVERABLES_VIEW_UNIVERSAL_IDENTIFIER,
});
