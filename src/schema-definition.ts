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
	| 'claude-sonnet-4-5-20250929'
	| 'claude-opus-4-5-20251101'
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
	| 'AskUserQuestion'
	| 'Bash'
	| 'BashOutput'
	| 'Edit'
	| 'ExitPlanMode'
	| 'Glob'
	| 'Grep'
	| 'KillShell'
	| 'MultiEdit'
	| 'NotebookEdit'
	| 'NotebookRead'
	| 'Read'
	| 'Skill'
	| 'SlashCommand'
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
	 * @pattern ^(\*||(AskUserQuestion|Bash|BashOutput|Edit|ExitPlanMode|Glob|Grep|KillShell|MultiEdit|NotebookEdit|NotebookRead|Read|Skill|SlashCommand|Task|TodoWrite|WebFetch|WebSearch|Write)(\|(AskUserQuestion|Bash|BashOutput|Edit|ExitPlanMode|Glob|Grep|KillShell|MultiEdit|NotebookEdit|NotebookRead|Read|Skill|SlashCommand|Task|TodoWrite|WebFetch|WebSearch|Write))*)$
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

/**
 * Sandbox network configuration
 */
export interface SandboxNetworkConfig {
	/**
	 * Unix socket paths accessible in sandbox (for SSH agents, etc.)
	 * @example ["~/.ssh/agent-socket"]
	 */
	allowUnixSockets?: string[];

	/**
	 * Allow binding to localhost ports (macOS only)
	 * @default false
	 */
	allowLocalBinding?: boolean;

	/**
	 * HTTP proxy port if bringing your own proxy
	 * @example 8080
	 */
	httpProxyPort?: number;

	/**
	 * SOCKS5 proxy port if bringing your own proxy
	 * @example 8081
	 */
	socksProxyPort?: number;
}

/**
 * Sandbox configuration for bash command isolation
 */
export interface SandboxConfig {
	/**
	 * Enable bash sandboxing (macOS/Linux only)
	 * @default false
	 */
	enabled?: boolean;

	/**
	 * Auto-approve bash commands when sandboxed
	 * @default true
	 */
	autoAllowBashIfSandboxed?: boolean;

	/**
	 * Commands that should run outside of the sandbox
	 * @example ["git", "docker"]
	 */
	excludedCommands?: string[];

	/**
	 * Allow commands to run outside sandbox via dangerouslyDisableSandbox parameter
	 * @default true
	 */
	allowUnsandboxedCommands?: boolean;

	/**
	 * Network configuration for sandbox
	 */
	network?: SandboxNetworkConfig;

	/**
	 * Enable weaker sandbox for unprivileged Docker environments (Linux only)
	 * Reduces security
	 * @default false
	 */
	enableWeakerNestedSandbox?: boolean;
}

/**
 * Marketplace source configuration for plugins
 */
export interface MarketplaceSource {
	/**
	 * Source type
	 */
	source: 'github' | 'git' | 'directory';

	/**
	 * GitHub repository (for github source)
	 * @example "company-org/claude-plugins"
	 */
	repo?: string;

	/**
	 * Git URL (for git source)
	 * @example "https://git.company.com/plugins.git"
	 */
	url?: string;

	/**
	 * Local filesystem path (for directory source, development only)
	 */
	path?: string;
}

/**
 * MCP server filter for allowlist/denylist
 */
export interface McpServerFilter {
	/**
	 * Name of the MCP server
	 */
	serverName: string;
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
	 * @example "claude-sonnet-4-5-20250929"
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

	/**
	 * Announcements to display to users at startup
	 * Multiple announcements are cycled through at random
	 * @example ["Welcome to Acme Corp! Review our code guidelines at docs.acme.com"]
	 */
	companyAnnouncements?: string[];

	/**
	 * Disable all hooks
	 * @example true
	 */
	disableAllHooks?: boolean;

	/**
	 * Automatically approve all MCP servers defined in project .mcp.json files
	 * @example true
	 */
	enableAllProjectMcpServers?: boolean;

	/**
	 * List of specific MCP servers from .mcp.json files to approve
	 * @example ["memory", "github"]
	 */
	enabledMcpjsonServers?: string[];

	/**
	 * List of specific MCP servers from .mcp.json files to reject
	 * @example ["filesystem"]
	 */
	disabledMcpjsonServers?: string[];

	/**
	 * Enterprise allowlist of MCP servers users can configure
	 * Undefined = no restrictions, empty array = lockdown
	 * @example [{ "serverName": "github" }]
	 */
	allowedMcpServers?: McpServerFilter[];

	/**
	 * Enterprise denylist of MCP servers that are explicitly blocked
	 * Denylist takes precedence over allowlist
	 * @example [{ "serverName": "filesystem" }]
	 */
	deniedMcpServers?: McpServerFilter[];

	/**
	 * Custom script that modifies the .aws directory for authentication
	 * @example "aws sso login --profile myprofile"
	 */
	awsAuthRefresh?: string;

	/**
	 * Custom script that outputs JSON with AWS credentials
	 * @example "/bin/generate_aws_grant.sh"
	 */
	awsCredentialExport?: string;

	/**
	 * Sandbox configuration for bash command isolation
	 */
	sandbox?: SandboxConfig;

	/**
	 * Map of enabled plugins
	 * Format: "plugin-name@marketplace-name": true/false
	 * @example { "formatter@company-tools": true }
	 */
	enabledPlugins?: Record<string, boolean>;

	/**
	 * Additional plugin marketplaces
	 * @example { "company-tools": { "source": { "source": "github", "repo": "company/plugins" } } }
	 */
	extraKnownMarketplaces?: Record<
		string,
		{ source: MarketplaceSource }
	>;
}
