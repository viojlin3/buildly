import {
  defineApplicationRole,
  SystemPermissionFlag,
} from 'twenty-sdk/define';

import {
  AGENT_RUN_OBJECT_UNIVERSAL_IDENTIFIER,
  AGENT_TASK_OBJECT_UNIVERSAL_IDENTIFIER,
  AGENT_UPDATE_OBJECT_UNIVERSAL_IDENTIFIER,
  APP_DISPLAY_NAME,
  APPROVAL_OBJECT_UNIVERSAL_IDENTIFIER,
  COMPETITOR_BENCHMARK_OBJECT_UNIVERSAL_IDENTIFIER,
  DEFAULT_ROLE_UNIVERSAL_IDENTIFIER,
  DELIVERABLE_OBJECT_UNIVERSAL_IDENTIFIER,
  MANAGED_AGENT_OBJECT_UNIVERSAL_IDENTIFIER,
  PROJECT_OBJECT_UNIVERSAL_IDENTIFIER,
  SEARCH_INSIGHT_OBJECT_UNIVERSAL_IDENTIFIER,
  SCHEDULED_MEETING_OBJECT_UNIVERSAL_IDENTIFIER,
  TRAFFIC_SNAPSHOT_OBJECT_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

const writableObjectUniversalIdentifiers = [
  PROJECT_OBJECT_UNIVERSAL_IDENTIFIER,
  MANAGED_AGENT_OBJECT_UNIVERSAL_IDENTIFIER,
  AGENT_TASK_OBJECT_UNIVERSAL_IDENTIFIER,
  AGENT_RUN_OBJECT_UNIVERSAL_IDENTIFIER,
  AGENT_UPDATE_OBJECT_UNIVERSAL_IDENTIFIER,
  DELIVERABLE_OBJECT_UNIVERSAL_IDENTIFIER,
  APPROVAL_OBJECT_UNIVERSAL_IDENTIFIER,
  SCHEDULED_MEETING_OBJECT_UNIVERSAL_IDENTIFIER,
  TRAFFIC_SNAPSHOT_OBJECT_UNIVERSAL_IDENTIFIER,
  COMPETITOR_BENCHMARK_OBJECT_UNIVERSAL_IDENTIFIER,
  SEARCH_INSIGHT_OBJECT_UNIVERSAL_IDENTIFIER,
];

export default defineApplicationRole({
  universalIdentifier: DEFAULT_ROLE_UNIVERSAL_IDENTIFIER,
  label: `${APP_DISPLAY_NAME} default role`,
  description:
    'Allows the command center and its agents to manage coordination records without destructive access.',
  canReadAllObjectRecords: false,
  canUpdateAllObjectRecords: false,
  canSoftDeleteAllObjectRecords: false,
  canDestroyAllObjectRecords: false,
  canAccessAllTools: true,
  canBeAssignedToAgents: true,
  canBeAssignedToUsers: false,
  canBeAssignedToApiKeys: false,
  objectPermissions: writableObjectUniversalIdentifiers.map(
    (objectUniversalIdentifier) => ({
      objectUniversalIdentifier,
      canReadObjectRecords: true,
      canUpdateObjectRecords: true,
      canSoftDeleteObjectRecords: false,
      canDestroyObjectRecords: false,
    }),
  ),
  fieldPermissions: [],
  permissionFlagUniversalIdentifiers: [
    SystemPermissionFlag.AI,
    SystemPermissionFlag.UPLOAD_FILE,
  ],
});
