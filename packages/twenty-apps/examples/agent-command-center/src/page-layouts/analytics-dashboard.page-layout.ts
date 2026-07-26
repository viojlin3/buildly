import {
  definePageLayout,
  PageLayoutTabLayoutMode,
} from 'twenty-sdk/define';

import {
  ANALYTICS_FRONT_COMPONENT_UNIVERSAL_IDENTIFIER,
  ANALYTICS_PAGE_LAYOUT_TAB_UNIVERSAL_IDENTIFIER,
  ANALYTICS_PAGE_LAYOUT_UNIVERSAL_IDENTIFIER,
  ANALYTICS_PAGE_LAYOUT_WIDGET_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default definePageLayout({
  universalIdentifier: ANALYTICS_PAGE_LAYOUT_UNIVERSAL_IDENTIFIER,
  name: 'Analytics Dashboard',
  type: 'STANDALONE_PAGE',
  tabs: [
    {
      universalIdentifier:
        ANALYTICS_PAGE_LAYOUT_TAB_UNIVERSAL_IDENTIFIER,
      title: 'Business Analytics',
      position: 0,
      icon: 'IconChartLine',
      layoutMode: PageLayoutTabLayoutMode.GRID,
      widgets: [
        {
          universalIdentifier:
            ANALYTICS_PAGE_LAYOUT_WIDGET_UNIVERSAL_IDENTIFIER,
          title: 'Analytics Dashboard',
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
              ANALYTICS_FRONT_COMPONENT_UNIVERSAL_IDENTIFIER,
          },
        },
      ],
    },
  ],
});
