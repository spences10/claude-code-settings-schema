# Update Claude Code Settings Schema

Check for updates to Claude Code settings and update
schema-definition.ts accordingly.

## Steps

1. **Fetch latest docs** from
   https://docs.anthropic.com/en/docs/claude-code/settings

2. **Read current schema** from src/schema-definition.ts

3. **Compare and identify** (check each section):

   | Category    | What to check                                                                                     |
   | ----------- | ------------------------------------------------------------------------------------------------- |
   | Settings    | [Available settings](https://code.claude.com/docs/en/settings#available-settings)                 |
   | Permissions | [Permission settings](https://code.claude.com/docs/en/settings#permission-settings)               |
   | Sandbox     | [Sandbox settings](https://code.claude.com/docs/en/settings#sandbox-settings)                     |
   | Hooks       | [Extending tools with hooks](https://code.claude.com/docs/en/settings#extending-tools-with-hooks) |
   | Tools       | [Tools available to Claude](https://code.claude.com/docs/en/settings#tools-available-to-claude)   |
   | Plugins     | [Plugin configuration](https://code.claude.com/docs/en/settings#plugin-configuration)             |

   For each section, identify:
   - 🆕 NEW: settings/tools not in current schema
   - ⚠️ DEPRECATED: items in schema but removed from docs
   - 🔄 CHANGED: modified types, descriptions, or defaults

4. **Present changes** in a table format:

   | Change | Category | Item    | Details                            |
   | ------ | -------- | ------- | ---------------------------------- |
   | 🆕     | Setting  | `foo`   | New setting for X                  |
   | ⚠️     | Tool     | `Bar`   | Not in docs (keep if undocumented) |
   | 🔄     | Model    | example | Updated to newer model             |

5. **After review**, apply approved changes to schema-definition.ts

6. **Regenerate schema**: Run `pnpm build && pnpm generate`

7. **Summary**: List all changes with links to relevant doc sections

## Notes

- Keep undocumented tools (like `MultiEdit`, `NotebookRead`) - they
  may be internal but still functional
- Update model examples to latest versions from docs
- Check `ClaudeModel` type includes all models mentioned in docs
