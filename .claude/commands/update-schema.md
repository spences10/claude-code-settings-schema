# Update Claude Code Settings Schema

Check for updates to Claude Code settings and update
schema-definition.ts accordingly.

## Steps

1. **Fetch latest docs** from
   https://docs.anthropic.com/en/docs/claude-code/settings

2. **Read current schema** from src/schema-definition.ts

3. **Compare and identify**:
   - New settings not in current schema
   - Deprecated/removed settings
   - Changed types or descriptions
   - New hook types
   - New tool names

4. **For each change found**:
   - Explain what changed
   - Show the proposed update to schema-definition.ts

5. **After review**, apply approved changes to schema-definition.ts

6. **Regenerate schema**: Run `pnpm build && pnpm generate`

7. **Summary**: List all changes made with links to relevant doc
   sections
