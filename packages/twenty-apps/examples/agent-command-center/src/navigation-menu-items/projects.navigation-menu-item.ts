import {
  defineNavigationMenuItem,
  NavigationMenuItemType,
} from 'twenty-sdk/define';

import {
  COMMAND_CENTER_NAVIGATION_UNIVERSAL_IDENTIFIER,
  PROJECTS_VIEW_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: '65cad7f5-147d-4f50-892f-12bb3361d0f4',
  name: 'Agent Projects',
  icon: 'IconBriefcase',
  color: 'blue',
  position: 1,
  type: NavigationMenuItemType.VIEW,
  folderUniversalIdentifier:
    COMMAND_CENTER_NAVIGATION_UNIVERSAL_IDENTIFIER,
  viewUniversalIdentifier: PROJECTS_VIEW_UNIVERSAL_IDENTIFIER,
});
