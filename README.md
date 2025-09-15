# claude-code-settings-schema

Generate reliable JSON Schema for Claude Code `.claude/settings.json`
configuration files.

## Installation & Usage

### One-time generation

```bash
# Using npx
npx claude-code-settings-schema

# Using pnpm
pnpm dlx claude-code-settings-schema

# Using the short alias (after global install)
pnpm dlx claude-code-settings-schema ccss
```

### Global installation

```bash
npm install -g claude-code-settings-schema
# or
pnpm add -g claude-code-settings-schema

# Then use either command:
claude-code-settings-schema
ccss  # alias
```

## Features

✅ **Complete validation** - Covers all Claude Code configuration
options ✅ **Pattern validation** - Validates tool permission patterns
like `Tool(pattern)` ✅ **Hook validation** - Proper structure for
PreToolUse, PostToolUse, etc. ✅ **IntelliSense support** - Full
autocomplete and error checking in your IDE ✅ **Official docs
based** - Generated from Anthropic's official documentation

## Usage with your settings

The commands above will create a `claude-code-settings.schema.json`
file in your current directory.

Add the schema reference to your `.claude/settings.json`, pointing to
where you generated the schema file:

```json
{
	"$schema": "./claude-code-settings.schema.json",
	"permissions": {
		"allow": ["Bash(git diff:*)", "Read(src/*)"],
		"deny": ["Read(.env)"],
		"ask": ["Write(*)"]
	},
	"hooks": {
		"PostToolUse": [
			{
				"matcher": "Edit|MultiEdit|Write",
				"hooks": [
					{
						"type": "command",
						"command": "prettier --write",
						"timeout": 30
					}
				]
			}
		]
	}
}
```

**Note:** The `$schema` path should match where you generated the
schema file. If you generated it in your project root but your
`.claude/settings.json` is in a subdirectory, use
`"../claude-code-settings.schema.json"` or the appropriate relative
path.

## What gets validated

- **Permissions**: `allow`, `deny`, `ask` arrays with proper tool
  patterns
- **Hooks**: All hook types with proper matcher and command structure
- **StatusLine**: Command configuration with type and optional padding
- **Environment**: Custom environment variables
- **Model**: Claude model selection
- **API Key Helper**: Script path for authentication

## License

MIT
