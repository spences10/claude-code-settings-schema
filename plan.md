# Claude Code Schema Generator

## Project Overview

**Objective**: Build an automated tool that generates accurate and
comprehensive JSON Schema for Claude Code settings by parsing official
documentation and analyzing real-world community configurations.

**Problem**: Manual schema creation is error-prone, misses
configuration options, and becomes outdated quickly as Claude Code
evolves.

**Solution**: Automated tool that scrapes authoritative sources and
generates validated, comprehensive schemas.

## Technical Specifications

### Language & Platform

- **Primary**: Node.js with TypeScript
- **Why**: Excellent HTML/Markdown parsing libraries, robust JSON
  Schema tooling, easy distribution via npm

### Architecture

```
claude-code-schema-generator/
 src/
    parsers/
       docs-parser.ts           # Parse official Anthropic documentation
       community-parser.ts      # Analyze community .claude/settings.json files
       github-searcher.ts       # Search GitHub for real configs
       schema-builder.ts        # Build comprehensive JSON schema
    generators/
       json-schema.ts           # Generate JSON Schema output
       typescript-defs.ts       # Generate TypeScript definitions (bonus)
       markdown-docs.ts         # Generate human-readable docs
    utils/
       fetcher.ts              # HTTP client with rate limiting
       validator.ts            # Validate generated schema against real configs
       pattern-detector.ts     # Detect patterns in permission rules
       logger.ts               # Structured logging
    types/
       schema.ts               # TypeScript types for schema structure
       config.ts               # Configuration types
    cli.ts                      # Command line interface
    index.ts                    # Main API
 tests/
    fixtures/                   # Real .claude/settings.json examples
    parsers/                    # Parser tests
    integration/                # End-to-end tests
 schemas/                        # Generated schema outputs
 examples/                       # Example configurations for testing
 docs/                          # Project documentation
 scripts/                       # Build and deployment scripts
```

## Core Features

### 1. Documentation Parser (`docs-parser.ts`)

- **Target**:
  https://docs.anthropic.com/en/docs/claude-code/settings.md
- **Extract**: All configuration fields, types, descriptions,
  examples, validation rules
- **Parse**: Hook types, permission structures, MCP server configs
- **Handle**: Dynamic content, nested structures, enum values

### 2. Community Config Analyzer (`community-parser.ts`)

- **Source**: GitHub search for `.claude/settings.json` files
- **Analyze**: Real-world usage patterns, common configurations
- **Detect**: Field combinations, permission rule patterns, hook usage
- **Identify**: Missing fields from official docs, deprecated options

### 3. Schema Generator (`json-schema.ts`)

- **Output**: Comprehensive JSON Schema (Draft 7+)
- **Include**: All discovered fields with proper types and validation
- **Validate**: Permission rule patterns (`Tool(pattern)` format)
- **Support**: Enum constraints, pattern matching, required fields
- **Generate**: Helpful descriptions and examples

### 4. Pattern Recognition (`pattern-detector.ts`)

- **Permission Rules**: Detect `Tool(pattern)` format variations
- **Hook Matchers**: Identify `Tool|Tool|Tool` combinations
- **Common Patterns**: Extract frequently used configurations
- **Validation Rules**: Generate regex patterns for validation

### 5. CLI Tool (`cli.ts`)

```bash
# Generate schema from latest docs
npx claude-schema-generator generate

# Include community analysis
npx claude-schema-generator generate --include-community

# Validate existing schema against real configs
npx claude-schema-generator validate --schema schema.json

# Output TypeScript definitions
npx claude-schema-generator generate --typescript

# Update existing schema
npx claude-schema-generator update --schema existing.json
```

### 6. Validation System (`validator.ts`)

- **Test Schema**: Against real-world `.claude/settings.json` files
- **Report Errors**: Missing fields, incorrect types, invalid patterns
- **Suggest Fixes**: For schema improvements
- **Coverage**: Track percentage of real configs that validate

## Data Sources

### Primary Sources

1. **Official Documentation**:
   https://docs.anthropic.com/en/docs/claude-code/

   - Settings configuration page
   - Hooks documentation
   - Permission system docs
   - MCP server configuration

2. **Community Repositories**: GitHub search results for:
   - `filename:.claude/settings.json`
   - `path:.claude filename:settings.json`
   - Real dotfiles repositories with Claude Code configs

### Analysis Strategy

- **Documentation First**: Extract official schema structure
- **Community Validation**: Verify against real-world usage
- **Pattern Recognition**: Identify common configuration patterns
- **Gap Detection**: Find fields used in practice but not documented

## Output Formats

### 1. JSON Schema

```json
{
  "title": "Claude Code Settings",
  "description": "Generated from official docs + community analysis",
  "type": "object",
  "properties": {
    /* comprehensive schema */
  },
  "definitions": {
    /* reusable patterns */
  }
}
```

### 2. TypeScript Definitions (Bonus)

```typescript
export interface ClaudeCodeSettings {
  permissions?: PermissionsConfig
  hooks?: HooksConfig
  // ... all discovered fields
}
```

### 3. Markdown Documentation

- Human-readable field descriptions
- Examples and usage patterns
- Migration guides for schema updates

## Quality Assurance

### Testing Strategy

1. **Unit Tests**: Individual parser and generator functions
2. **Integration Tests**: End-to-end schema generation
3. **Validation Tests**: Generated schema against real configs
4. **Regression Tests**: Detect schema changes over time

### Validation Metrics

- **Coverage**: % of real configs that validate successfully
- **Completeness**: % of documented fields included
- **Accuracy**: % of field types/constraints correct
- **Freshness**: Age of source documentation

## Implementation Phases

### Phase 1: Core Parser

- Documentation scraper for official Anthropic docs
- Basic JSON schema generation
- Simple CLI interface

### Phase 2: Community Analysis

- GitHub search and config collection
- Pattern recognition for permission rules
- Enhanced schema with real-world patterns

### Phase 3: Validation & Polish

- Comprehensive validation system
- TypeScript definition generation
- Documentation and examples

### Phase 4: Automation

- Automated schema updates
- CI/CD integration
- Package distribution

## Dependencies

### Core Libraries

```json
{
  "cheerio": "^1.0.0", // HTML parsing
  "unified": "^11.0.0", // Markdown processing
  "remark": "^15.0.0", // Markdown parser
  "json-schema": "^0.4.0", // Schema validation
  "commander": "^11.0.0", // CLI framework
  "axios": "^1.6.0", // HTTP client
  "typescript": "^5.3.0" // TypeScript support
}
```

### Development Tools

```json
{
  "jest": "^29.7.0", // Testing framework
  "eslint": "^8.56.0", // Code linting
  "prettier": "^3.1.0", // Code formatting
  "@types/node": "^20.10.0" // Node.js types
}
```

## Success Criteria

1. **Comprehensive Schema**: Covers 95%+ of documented configuration
   options
2. **Community Validation**: 90%+ of real configs validate
   successfully
3. **Pattern Recognition**: Accurately detects permission rule formats
4. **Maintainable**: Easy to update when Claude Code documentation
   changes
5. **Usable**: Simple CLI that others can use to generate/update
   schemas
6. **Accurate**: Generated schemas catch real configuration errors

## Future Enhancements

- **Auto-updates**: Scheduled schema regeneration
- **IDE Integration**: VS Code extension with schema
- **Configuration Linting**: Detect common config mistakes
- **Migration Tools**: Help update configs when schema changes
- **Web Interface**: Browser-based schema explorer

## Getting Started

1. Set up Node.js/TypeScript project structure
2. Implement documentation parser for Anthropic docs
3. Create basic JSON schema generator
4. Add community config analysis
5. Build comprehensive validation system
6. Package as distributable CLI tool

This tool will solve the manual schema creation problem and provide
the Claude Code community with an authoritative, always-current
configuration schema.
