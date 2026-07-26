import {
  defineNavigationMenuItem,
  NavigationMenuItemType,
} from 'twenty-sdk/define';

import {
  SCHEDULED_MEETINGS_NAVIGATION_UNIVERSAL_IDENTIFIER,
  SCHEDULED_MEETINGS_VIEW_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: SCHEDULED_MEETINGS_NAVIGATION_UNIVERSAL_IDENTIFIER,
  name: 'Calendar',
  icon: 'IconCalendarEvent',
  color: 'cyan',
  position: 1,
  type: NavigationMenuItemType.VIEW,
  viewUniversalIdentifier: SCHEDULED_MEETINGS_VIEW_UNIVERSAL_IDENTIFIER,
});
