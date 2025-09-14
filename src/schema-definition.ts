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
export interface hook_command {
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
 * Hook matcher configuration
 */
export interface hook_matcher {
	/**
	 * Tool pattern matcher (optional, case-sensitive)
	 * Empty string or "*" matches all tools
	 * @examples ["Edit|MultiEdit|Write", "Bash", "*", ""]
	 */
	matcher?: string;

	/**
	 * Array of hooks to execute
	 */
	hooks: hook_command[];
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
	 * Custom hooks for tool execution
	 */
	hooks?: {
		/**
		 * Hooks that run before tool calls
		 */
		PreToolUse?: hook_matcher[];

		/**
		 * Hooks that run after tool completion
		 */
		PostToolUse?: hook_matcher[];

		/**
		 * Hooks that run on notifications
		 */
		Notification?: hook_matcher[];

		/**
		 * Hooks that run when user submits a prompt
		 */
		UserPromptSubmit?: hook_matcher[];

		/**
		 * Hooks that run when stopping
		 */
		Stop?: hook_matcher[];

		/**
		 * Hooks that run when subagent stops
		 */
		SubagentStop?: hook_matcher[];

		/**
		 * Hooks that run before compacting
		 */
		PreCompact?: hook_matcher[];

		/**
		 * Hooks that run at session start
		 */
		SessionStart?: hook_matcher[];

		/**
		 * Hooks that run at session end
		 */
		SessionEnd?: hook_matcher[];
	};

	/**
	 * Script path for generating authentication values
	 * @example "/bin/generate_temp_api_key.sh"
	 */
	apiKeyHelper?: string;

	/**
	 * Custom status line configuration
	 */
	statusLine?: string | object;

	/**
	 * Output style configuration
	 */
	outputStyle?: string | object;
}
