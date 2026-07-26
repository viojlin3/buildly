import { defineView, ViewType } from 'twenty-sdk/define';

import {
  AGENT_TASK_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  AGENT_TASK_OBJECT_UNIVERSAL_IDENTIFIER,
  AGENT_TASK_PRIORITY_FIELD_UNIVERSAL_IDENTIFIER,
  AGENT_TASK_PROGRESS_FIELD_UNIVERSAL_IDENTIFIER,
  AGENT_TASK_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
  TASK_AGENT_FIELD_UNIVERSAL_IDENTIFIER,
  TASK_BOARD_VIEW_UNIVERSAL_IDENTIFIER,
  TASK_PROJECT_FIELD_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';
import { AGENT_TASK_STATUS_OPTIONS } from 'src/objects/agent-task.object';

const GROUP_UNIVERSAL_IDENTIFIERS = [
  '55cc35d1-d202-4f97-a3d0-6780b7fe4105',
  '618d238a-814d-45e6-bbbe-d93f620a8e1b',
  '82396f8d-5a14-4fc8-851e-57f845cbf1e3',
  '93548887-07c8-4991-af39-84b7452b18e6',
  'd84a51a0-efcd-4381-b110-6a563ff5500e',
  'daf0b989-a0e8-4525-9bf9-f7979d6115d0',
  '909f5cf1-085c-4d1f-80c9-c958e4b2293d',
  '57b05956-4885-4100-a4a9-bfea5fc22459',
];

export default defineView({
  universalIdentifier: TASK_BOARD_VIEW_UNIVERSAL_IDENTIFIER,
  name: 'Agent task board',
  objectUniversalIdentifier: AGENT_TASK_OBJECT_UNIVERSAL_IDENTIFIER,
  type: ViewType.KANBAN,
  icon: 'IconLayoutKanban',
  position: 1,
  mainGroupByFieldMetadataUniversalIdentifier:
    AGENT_TASK_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
  fields: [
    {
      universalIdentifier: '7bfaf23d-59dc-4eca-a698-3eb84e94ec6d',
      fieldMetadataUniversalIdentifier:
        AGENT_TASK_NAME_FIELD_UNIVERSAL_IDENTIFIER,
      position: 0,
      isVisible: true,
      size: 240,
    },
    {
      universalIdentifier: 'a194ce9c-e6ca-4e16-886f-78dc15474f7b',
      fieldMetadataUniversalIdentifier:
        AGENT_TASK_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
      position: 1,
      isVisible: true,
      size: 130,
    },
    {
      universalIdentifier: '8b92391f-6b39-4d82-9e21-827babeb6ca5',
      fieldMetadataUniversalIdentifier: TASK_AGENT_FIELD_UNIVERSAL_IDENTIFIER,
      position: 2,
      isVisible: true,
      size: 170,
    },
    {
      universalIdentifier: '89d8ff3e-b72d-4e9c-8aca-6c88087b1a52',
      fieldMetadataUniversalIdentifier: TASK_PROJECT_FIELD_UNIVERSAL_IDENTIFIER,
      position: 3,
      isVisible: true,
      size: 170,
    },
    {
      universalIdentifier: 'b9b152a4-061a-402c-98ea-4e7a3f80a1bc',
      fieldMetadataUniversalIdentifier:
        AGENT_TASK_PRIORITY_FIELD_UNIVERSAL_IDENTIFIER,
      position: 4,
      isVisible: true,
      size: 110,
    },
    {
      universalIdentifier: '327a90cb-7aa0-4e1a-84d2-3e6cf3301047',
      fieldMetadataUniversalIdentifier:
        AGENT_TASK_PROGRESS_FIELD_UNIVERSAL_IDENTIFIER,
      position: 5,
      isVisible: true,
      size: 100,
    },
  ],
  groups: AGENT_TASK_STATUS_OPTIONS.map((option, index) => ({
    universalIdentifier: GROUP_UNIVERSAL_IDENTIFIERS[index],
    fieldValue: option.value,
    position: index,
    isVisible: option.value !== 'CANCELLED',
  })),
});

