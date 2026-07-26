import {
  definePageLayout,
  PageLayoutTabLayoutMode,
} from 'twenty-sdk/define';

import {
  COMMAND_CENTER_FRONT_COMPONENT_UNIVERSAL_IDENTIFIER,
  COMMAND_CENTER_PAGE_LAYOUT_TAB_UNIVERSAL_IDENTIFIER,
  COMMAND_CENTER_PAGE_LAYOUT_UNIVERSAL_IDENTIFIER,
  COMMAND_CENTER_PAGE_LAYOUT_WIDGET_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default definePageLayout({
  universalIdentifier: COMMAND_CENTER_PAGE_LAYOUT_UNIVERSAL_IDENTIFIER,
  name: 'Agent Command Center',
  type: 'STANDALONE_PAGE',
  tabs: [
    {
      universalIdentifier:
        COMMAND_CENTER_PAGE_LAYOUT_TAB_UNIVERSAL_IDENTIFIER,
      title: 'Live Operations',
      position: 0,
      icon: 'IconActivityHeartbeat',
      layoutMode: PageLayoutTabLayoutMode.GRID,
      widgets: [
        {
          universalIdentifier:
            COMMAND_CENTER_PAGE_LAYOUT_WIDGET_UNIVERSAL_IDENTIFIER,
          title: 'Agent Command Center',
          type: 'FRONT_COMPONENT',
          gridPosition: {
            row: 0,
            column: 0,
            rowSpan: 12,
            columnSpan: 12,
          },
          configuration: {
            configurationType: 'FRONT_COMPONENT',
            frontComponentUniversalIdentifier:
              COMMAND_CENTER_FRONT_COMPONENT_UNIVERSAL_IDENTIFIER,
          },
        },
      ],
    },
  ],
});

