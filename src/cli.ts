#!/usr/bin/env node

import {
	existsSync,
	mkdirSync,
	readFileSync,
	writeFileSync,
} from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { generate_claude_code_schema } from './generate-schema';

const HELP = `
claude-code-settings-schema (ccss)

Adds JSON schema validation to Claude Code settings files.
Generates a schema file and adds $schema reference to settings.

USAGE:
  ccss --scope <project|global> --file <settings.json|settings.local.json>
  ccss --help

OPTIONS:
  --scope     Where to install (required)
              project  - .claude/ in current directory
              global   - ~/.claude/ (user home)

  --file      Which settings file to configure (required)
              settings.json       - shared/committed settings
              settings.local.json - personal/gitignored settings

  --help      Show this help message

EXAMPLES:
  # Add schema to project settings (shared with team)
  ccss --scope project --file settings.json

  # Add schema to personal project settings
  ccss --scope project --file settings.local.json

  # Add schema to global user settings
  ccss --scope global --file settings.json

OUTPUT:
  Creates settings.schema.json in the target directory
  Adds "$schema": "./settings.schema.json" to the settings file
  Creates settings file if it doesn't exist

NOTE:
  Re-run this command after updating the package to get the latest schema.
`;

interface CliArgs {
	scope?: 'project' | 'global';
	file?: 'settings.json' | 'settings.local.json';
	help?: boolean;
}

function parseArgs(args: string[]): CliArgs {
	const result: CliArgs = {};

	for (let i = 0; i < args.length; i++) {
		const arg = args[i];
		if (arg === '--help' || arg === '-h') {
			result.help = true;
		} else if (arg === '--scope') {
			const value = args[++i];
			if (value === 'project' || value === 'global') {
				result.scope = value;
			} else {
				console.error(
					`Invalid scope: ${value}. Use 'project' or 'global'.`,
				);
				process.exit(1);
			}
		} else if (arg === '--file') {
			const value = args[++i];
			if (
				value === 'settings.json' ||
				value === 'settings.local.json'
			) {
				result.file = value;
			} else {
				console.error(
					`Invalid file: ${value}. Use 'settings.json' or 'settings.local.json'.`,
				);
				process.exit(1);
			}
		}
	}

	return result;
}

function getTargetDir(scope: 'project' | 'global'): string {
	if (scope === 'global') {
		return join(homedir(), '.claude');
	}
	return join(process.cwd(), '.claude');
}

function ensureDir(dir: string): void {
	if (!existsSync(dir)) {
		mkdirSync(dir, { recursive: true });
		console.log(`Created directory: ${dir}`);
	}
}

function writeSchema(targetDir: string): string {
	const schema = generate_claude_code_schema();
	const schemaPath = join(targetDir, 'settings.schema.json');
	writeFileSync(schemaPath, JSON.stringify(schema, null, '\t'));
	return schemaPath;
}

function updateSettingsFile(
	targetDir: string,
	fileName: string,
): string {
	const settingsPath = join(targetDir, fileName);
	let settings: Record<string, unknown> = {};

	if (existsSync(settingsPath)) {
		try {
			const content = readFileSync(settingsPath, 'utf-8');
			settings = JSON.parse(content);
		} catch {
			console.error(`Failed to parse ${settingsPath}`);
			process.exit(1);
		}
	}

	// Add $schema reference
	settings['$schema'] = './settings.schema.json';

	// Write back with $schema first
	const { $schema, ...rest } = settings;
	const ordered = { $schema, ...rest };
	writeFileSync(settingsPath, JSON.stringify(ordered, null, '\t'));

	return settingsPath;
}

function main() {
	const args = parseArgs(process.argv.slice(2));

	if (args.help || process.argv.length === 2) {
		console.log(HELP);
		process.exit(0);
	}

	if (!args.scope) {
		console.error('Missing required option: --scope');
		console.error("Use 'ccss --help' for usage information.");
		process.exit(1);
	}

	if (!args.file) {
		console.error('Missing required option: --file');
		console.error("Use 'ccss --help' for usage information.");
		process.exit(1);
	}

	try {
		const targetDir = getTargetDir(args.scope);
		ensureDir(targetDir);

		const schemaPath = writeSchema(targetDir);
		console.log(`✓ Created schema: ${schemaPath}`);

		const settingsPath = updateSettingsFile(targetDir, args.file);
		console.log(`✓ Updated settings: ${settingsPath}`);

		console.log(
			'\nSchema validation enabled. Your editor should now provide:',
		);
		console.log('  - Autocomplete for settings');
		console.log('  - Validation errors for invalid values');
		console.log('  - Hover documentation');
	} catch (error) {
		console.error(`Error: ${error}`);
		process.exit(1);
	}
}

if (require.main === module) {
	main();
}
