import { defineSkill } from 'twenty-sdk/define';

import { COORDINATION_SKILL_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';

export default defineSkill({
  universalIdentifier: COORDINATION_SKILL_UNIVERSAL_IDENTIFIER,
  name: 'agent-coordination',
  label: 'Agent Coordination',
  description:
    'A shared operating protocol for tasks, progress, blockers, handoffs, and approvals.',
  icon: 'IconSitemap',
  content: [
    'Work from Agent Task records and keep the command center current.',
    'At the start of work, create or identify an Agent Run and report RUNNING.',
    'Report a concise progress update whenever the current action changes.',
    'Use WAITING when another agent or human must respond. Use BLOCKED only when work cannot continue.',
    'Every handoff must name the receiving agent, the expected output, and any dependency.',
    'Do not mark a task DONE until its deliverables and final result are recorded.',
    'Request an Agent Approval before irreversible, expensive, or externally visible actions.',
    'Keep progress between 0 and 100 and include a stable external run ID in every update.',
  ].join('\n'),
});

