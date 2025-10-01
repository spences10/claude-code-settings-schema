/**
 * Claude Code Settings Schema Definition
 * Based on official documentation from https://docs.anthropic.com/en/docs/claude-code/settings
 */

/**
 * Tool permission pattern. Format: ToolName or ToolName(pattern)
 * @pattern ^[A-Za-z][A-Za-z0-9]*(\([^)]*\))?$
 * @examples ["Bash", "Read(*.md)", "Write(src/*)", "WebFetch"]
 */
export type ToolPattern = string;

/**
 * Available Claude models
 */
export type ClaudeModel =
	| 'claude-3-5-sonnet-20241022'
	| 'claude-3-5-haiku-20241022'
	| 'claude-3-opus-20240229'
	| 'claude-3-sonnet-20240229'
	| 'claude-3-haiku-20240307'
	| string; // Allow custom models

/**
 * Hook command configuration
 */
export interface HookCommand {
	/**
	 * Command type
	 */
	type: 'command';

	/**
	 * Command to execute
	 * @example "prettier --write $file_path"
	 */
	command: string;

	/**
	 * Timeout in seconds (optional)
	 * @example 60
	 */
	timeout?: number;
}

/**
 * Valid Claude Code tool names
 */
export type ValidToolName =
	| 'Bash'
	| 'Edit'
	| 'Glob'
	| 'Grep'
	| 'MultiEdit'
	| 'NotebookEdit'
	| 'NotebookRead'
	| 'Read'
	| 'Task'
	| 'TodoWrite'
	| 'WebFetch'
	| 'WebSearch'
	| 'Write';

/**
 * Hook matcher configuration
 */
export interface HookMatcher {
	/**
	 * Tool pattern matcher (optional, case-sensitive)
	 * Empty string or "*" matches all tools
	 * Use "|" to match multiple tools: "Edit|Write|MultiEdit"
	 * @pattern ^(\*||(Edit|Bash|Glob|Grep|MultiEdit|NotebookEdit|NotebookRead|Read|Task|TodoWrite|WebFetch|WebSearch|Write)(\|(Edit|Bash|Glob|Grep|MultiEdit|NotebookEdit|NotebookRead|Read|Task|TodoWrite|WebFetch|WebSearch|Write))*)$
	 * @examples ["Edit|MultiEdit|Write", "Bash", "*", ""]
	 */
	matcher?: string;

	/**
	 * Array of hooks to execute
	 */
	hooks: HookCommand[];
}

/**
 * Status line command configuration
 */
export interface StatusLineConfig {
	/**
	 * Status line type
	 */
	type: 'command';

	/**
	 * Command or script path to execute for status line
	 * @example "~/.claude/statusline.sh"
	 */
	command: string;

	/**
	 * Padding for status line display (optional)
	 * Set to 0 for edge-to-edge display
	 * @example 0
	 */
	padding?: number;
}

export interface ClaudeCodeSettings {
	/**
	 * Permission configuration for tool usage and file access
	 */
	permissions?: {
		/**
		 * Array of allowed tool patterns. Format: Tool(pattern) or just Tool
		 * @pattern ^[A-Za-z]+(\([^)]*\))?$
		 * @examples ["Bash(git diff:*)", "Read(src/*)", "Write(*.md)", "WebFetch"]
		 */
		allow?: ToolPattern[];

		/**
		 * Array of denied tool patterns. Format: Tool(pattern) or just Tool
		 * @pattern ^[A-Za-z]+(\([^)]*\))?$
		 * @examples ["Read(./.env)", "WebFetch", "Bash(rm *)"]
		 */
		deny?: ToolPattern[];

		/**
		 * Array of tool patterns that require confirmation. Format: Tool(pattern) or just Tool
		 * @pattern ^[A-Za-z]+(\([^)]*\))?$
		 * @examples ["Write(*)", "Bash(*)", "Delete"]
		 */
		ask?: ToolPattern[];

		/**
		 * Additional working directories that Claude has access to
		 * @examples [["../docs/"]]
		 */
		additionalDirectories?: string[];

		/**
		 * Default permission mode when opening Claude Code
		 * @example "acceptEdits"
		 */
		defaultMode?: string;

		/**
		 * Set to "disable" to prevent bypassPermissions mode from being activated
		 * @example "disable"
		 */
		disableBypassPermissionsMode?: string;
	};

	/**
	 * Environment variables to set for Claude Code sessions
	 * @example { "API_KEY": "sk-...", "NODE_ENV": "development" }
	 */
	env?: Record<string, string>;

	/**
	 * Override the default AI model
	 * @example "claude-3-5-sonnet-20241022"
	 */
	model?: ClaudeModel;

	/**
	 * How long to locally retain chat transcripts based on last activity date
	 * @example 20
	 * @default 30
	 */
	cleanupPeriodDays?: number;

	/**
	 * Whether to include the co-authored-by Claude byline in git commits and pull requests
	 * @example false
	 * @default true
	 */
	includeCoAuthoredBy?: boolean;

	/**
	 * Use "claudeai" to restrict login to Claude.ai accounts, "console" to restrict login to Claude Console (API usage billing) accounts
	 * @example "claudeai"
	 */
	forceLoginMethod?: string;

	/**
	 * Specify the UUID of an organization to automatically select it during login, bypassing the organization selection step
	 * Requires forceLoginMethod to be set
	 * @example "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
	 */
	forceLoginOrgUUID?: string;

	/**
	 * Custom hooks for tool execution
	 */
	hooks?: {
		/**
		 * Hooks that run before tool calls
		 */
		PreToolUse?: HookMatcher[];

		/**
		 * Hooks that run after tool completion
		 */
		PostToolUse?: HookMatcher[];

		/**
		 * Hooks that run on notifications
		 */
		Notification?: HookMatcher[];

		/**
		 * Hooks that run when user submits a prompt
		 */
		UserPromptSubmit?: HookMatcher[];

		/**
		 * Hooks that run when stopping
		 */
		Stop?: HookMatcher[];

		/**
		 * Hooks that run when subagent stops
		 */
		SubagentStop?: HookMatcher[];

		/**
		 * Hooks that run before compacting
		 */
		PreCompact?: HookMatcher[];

		/**
		 * Hooks that run at session start
		 */
		SessionStart?: HookMatcher[];

		/**
		 * Hooks that run at session end
		 */
		SessionEnd?: HookMatcher[];
	};

	/**
	 * Script path for generating authentication values
	 * @example "/bin/generate_temp_api_key.sh"
	 */
	apiKeyHelper?: string;

	/**
	 * Custom status line configuration
	 */
	statusLine?: StatusLineConfig;

	/**
	 * Output style configuration
	 */
	outputStyle?: string | object;
}
