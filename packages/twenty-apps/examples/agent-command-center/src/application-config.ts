import { defineApplication } from 'twenty-sdk/define';

import {
  APP_DESCRIPTION,
  APP_DISPLAY_NAME,
  APPLICATION_UNIVERSAL_IDENTIFIER,
  CALDIY_BASE_URL_VARIABLE_UNIVERSAL_IDENTIFIER,
  CALDIY_WEBHOOK_SECRET_VARIABLE_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

// The role in src/roles/default-role.ts is discovered automatically.
export default defineApplication({
  universalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER,
  displayName: APP_DISPLAY_NAME,
  description: APP_DESCRIPTION,
  author: 'Twenty',
  category: 'Productivity',
  applicationVariables: {
    CALDIY_BASE_URL: {
      universalIdentifier: CALDIY_BASE_URL_VARIABLE_UNIVERSAL_IDENTIFIER,
      description:
        'Base URL of the Cal.diy instance. For this local workspace, use http://localhost:3001.',
      isSecret: false,
    },
    CALDIY_WEBHOOK_SECRET: {
      universalIdentifier:
        CALDIY_WEBHOOK_SECRET_VARIABLE_UNIVERSAL_IDENTIFIER,
      description:
        'Shared secret used to verify the X-Cal-Signature-256 header on booking webhooks.',
      isSecret: true,
    },
  },
});
