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
		 * Commands to run before tool execution
		 * @example { "Bash": "echo 'Running command...'" }
		 */
		PreToolUse?: Record<string, string>;

		/**
		 * Commands to run after tool execution
		 * @example { "Write": "git add ." }
		 */
		PostToolUse?: Record<string, string>;
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
