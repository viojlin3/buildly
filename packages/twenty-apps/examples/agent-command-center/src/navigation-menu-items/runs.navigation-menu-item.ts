import {
  defineNavigationMenuItem,
  NavigationMenuItemType,
} from 'twenty-sdk/define';

import { RUNS_VIEW_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: '1cb780b5-42c1-40e4-ada6-fac4f83228c1',
  name: 'Agent Runs',
  icon: 'IconPlayerPlay',
  color: 'orange',
  position: 4,
  type: NavigationMenuItemType.VIEW,
  viewUniversalIdentifier: RUNS_VIEW_UNIVERSAL_IDENTIFIER,
});

