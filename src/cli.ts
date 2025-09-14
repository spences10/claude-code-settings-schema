#!/usr/bin/env node

import { generate_claude_code_schema } from './generate-schema';

function main() {
	try {
		const schema = generate_claude_code_schema();
		process.stdout.write(JSON.stringify(schema, null, 2));
	} catch (error) {
		process.stderr.write(`Error generating schema: ${error}\n`);
		process.exit(1);
	}
}

if (require.main === module) {
	main();
}
