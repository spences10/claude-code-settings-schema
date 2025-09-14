# claude-code-settings-schema

Generate reliable JSON Schema for Claude Code `.claude/settings.json`
configuration files.

## Installation & Usage

### One-time generation

```bash
# Using npx
npx claude-code-settings-schema > claude-code-settings.schema.json

# Using pnpm
pnpm dlx claude-code-settings-schema > claude-code-settings.schema.json
```

### Local installation

```bash
npm install -g claude-code-settings-schema
generate-claude-schema > claude-code-settings.schema.json
```

## Features

✅ **Complete validation** - Covers all Claude Code configuration
options ✅ **Pattern validation** - Validates tool permission patterns
like `Tool(pattern)` ✅ **Hook validation** - Proper structure for
PreToolUse, PostToolUse, etc. ✅ **IntelliSense support** - Full
autocomplete and error checking in your IDE ✅ **Official docs
based** - Generated from Anthropic's official documentation

## Usage with your settings

Add the schema reference to your `.claude/settings.json`:

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
