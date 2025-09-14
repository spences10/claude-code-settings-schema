#!/usr/bin/env node

import { generate_claude_code_schema } from './generate-schema';

function main() {
	try {
		const schema = generate_claude_code_schema();
		console.log(JSON.stringify(schema, null, 2));
	} catch (error) {
		console.error('Error generating schema:', error);
		process.exit(1);
	}
}

if (require.main === module) {
	main();
}
