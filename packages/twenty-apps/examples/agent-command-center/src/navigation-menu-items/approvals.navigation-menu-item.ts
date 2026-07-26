import {
  defineNavigationMenuItem,
  NavigationMenuItemType,
} from 'twenty-sdk/define';

import { APPROVALS_VIEW_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: '388a88b2-636b-4dbf-8d66-76be3cbe1e23',
  name: 'Approvals',
  icon: 'IconUserCheck',
  color: 'red',
  position: 6,
  type: NavigationMenuItemType.VIEW,
  viewUniversalIdentifier: APPROVALS_VIEW_UNIVERSAL_IDENTIFIER,
});

