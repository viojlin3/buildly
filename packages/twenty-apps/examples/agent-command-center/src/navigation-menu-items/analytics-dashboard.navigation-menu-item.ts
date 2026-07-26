import {
  defineNavigationMenuItem,
  NavigationMenuItemType,
} from 'twenty-sdk/define';

import {
  ANALYTICS_NAVIGATION_UNIVERSAL_IDENTIFIER,
  ANALYTICS_PAGE_LAYOUT_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: ANALYTICS_NAVIGATION_UNIVERSAL_IDENTIFIER,
  name: 'Analytics Dashboard',
  icon: 'IconChartLine',
  color: 'cyan',
  position: 2,
  type: NavigationMenuItemType.PAGE_LAYOUT,
  pageLayoutUniversalIdentifier:
    ANALYTICS_PAGE_LAYOUT_UNIVERSAL_IDENTIFIER,
});
