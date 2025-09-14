import * as path from 'path';
import * as TJS from 'typescript-json-schema';

export function generate_claude_code_schema(): object {
	// Settings for typescript-json-schema
	const settings: TJS.PartialArgs = {
		required: true,
		titles: true,
		defaultProps: false,
		noExtraProps: false,
		propOrder: false,
		typeOfKeyword: false,
		out: undefined,
	};

	// Create TypeScript program
	const program = TJS.getProgramFromFiles(
		[path.join(__dirname, '../src/schema-definition.ts')],
		{
			target: 1, // ES5
			module: 1, // CommonJS
		},
	);

	// Generate schema for ClaudeCodeSettings interface
	const schema = TJS.generateSchema(
		program,
		'ClaudeCodeSettings',
		settings,
	);

	if (!schema) {
		throw new Error(
			'Failed to generate schema for ClaudeCodeSettings',
		);
	}

	// Enhance the schema with Claude Code specific metadata and validation
	const enhanced_schema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		title: 'Claude Code Settings',
		description:
			'JSON Schema for Claude Code .claude/settings.json configuration files',
		...schema,
		examples: [
			{
				permissions: {
					allow: ['Bash(git diff:*)', 'Read(src/*)'],
					deny: ['Read(./.env)', 'WebFetch'],
					ask: ['Write(*)'],
				},
				env: {
					NODE_ENV: 'development',
				},
				model: 'claude-3-5-sonnet-20241022',
			},
		],
	};

	// Add pattern validation for tool permissions
	if (
		enhanced_schema.properties &&
		typeof enhanced_schema.properties === 'object' &&
		enhanced_schema.properties.permissions &&
		typeof enhanced_schema.properties.permissions === 'object' &&
		enhanced_schema.properties.permissions.properties
	) {
		const tool_pattern_schema = {
			type: 'string',
			pattern: '^[A-Za-z][A-Za-z0-9]*(\\([^)]*\\))?$',
			description:
				'Tool permission pattern. Format: ToolName or ToolName(pattern)',
			examples: [
				'Bash',
				'Read(*.md)',
				'Write(src/*)',
				'WebFetch',
				'Bash(git diff:*)',
			],
		};

		const perm_props = enhanced_schema.properties.permissions
			.properties as any;
		['allow', 'deny', 'ask'].forEach((prop) => {
			if (perm_props[prop] && perm_props[prop].items) {
				perm_props[prop].items = tool_pattern_schema;
			}
		});
	}

	// Add pattern validation for hook matchers
	if (
		enhanced_schema.definitions &&
		enhanced_schema.definitions.HookMatcher
	) {
		const hook_matcher_def = enhanced_schema.definitions
			.HookMatcher as any;
		if (
			hook_matcher_def.properties &&
			hook_matcher_def.properties.matcher
		) {
			hook_matcher_def.properties.matcher.pattern =
				'^(\\*|||(Edit|Bash|Glob|Grep|MultiEdit|NotebookEdit|NotebookRead|Read|Task|TodoWrite|WebFetch|WebSearch|Write)(\\|(Edit|Bash|Glob|Grep|MultiEdit|NotebookEdit|NotebookRead|Read|Task|TodoWrite|WebFetch|WebSearch|Write))*)$';
		}
	}

	return enhanced_schema;
}
