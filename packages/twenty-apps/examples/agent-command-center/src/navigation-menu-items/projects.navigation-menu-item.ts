import {
  defineNavigationMenuItem,
  NavigationMenuItemType,
} from 'twenty-sdk/define';

import { PROJECTS_VIEW_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: '65cad7f5-147d-4f50-892f-12bb3361d0f4',
  name: 'Agent Projects',
  icon: 'IconBriefcase',
  color: 'blue',
  position: 1,
  type: NavigationMenuItemType.VIEW,
  viewUniversalIdentifier: PROJECTS_VIEW_UNIVERSAL_IDENTIFIER,
});

