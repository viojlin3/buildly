\set ON_ERROR_STOP on

BEGIN;

-- Scope these changes to workspaces where Agent Command Center is installed.
WITH target_workspaces AS (
  SELECT DISTINCT "workspaceId"
  FROM core."navigationMenuItem"
  WHERE "universalIdentifier" = '470a7fe6-64f7-4c1c-b285-57c444b69369'
)
UPDATE core."objectMetadata" AS object_metadata
SET
  overrides = COALESCE(object_metadata.overrides, '{}'::jsonb) ||
    '{"labelSingular":"Customer","labelPlural":"Customers"}'::jsonb,
  "updatedAt" = NOW()
FROM target_workspaces
WHERE object_metadata."workspaceId" = target_workspaces."workspaceId"
  AND object_metadata."nameSingular" = 'company';

-- Removing navigation items hides them without deleting their objects or data.
WITH target_workspaces AS (
  SELECT DISTINCT "workspaceId"
  FROM core."navigationMenuItem"
  WHERE "universalIdentifier" = '470a7fe6-64f7-4c1c-b285-57c444b69369'
)
DELETE FROM core."navigationMenuItem" AS navigation_item
USING target_workspaces
WHERE navigation_item."workspaceId" = target_workspaces."workspaceId"
  AND navigation_item."universalIdentifier" IN (
    '20202020-b005-4b05-8b05-c0aba11c0005', -- People
    '20202020-b006-4b06-8b06-c0aba11c0006', -- Tasks
    '20202020-b003-4b03-8b03-c0aba11c0003', -- Notes
    '20202020-b002-4b02-8b02-c0aba11c0002'  -- Dashboards
  );

COMMIT;
