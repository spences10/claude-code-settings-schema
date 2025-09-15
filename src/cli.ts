#!/usr/bin/env node

import { writeFileSync } from 'fs';
import { generate_claude_code_schema } from './generate-schema';

function main() {
	try {
		const schema = generate_claude_code_schema();
		const filename = 'claude-code-settings.schema.json';
		writeFileSync(filename, JSON.stringify(schema, null, 2));
		console.log(`Schema generated successfully: ${filename}`);
	} catch (error) {
		process.stderr.write(`Error generating schema: ${error}\n`);
		process.exit(1);
	}
}

if (require.main === module) {
	main();
}
