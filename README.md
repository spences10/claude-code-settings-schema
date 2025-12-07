# claude-code-settings-schema

> ⚠️ **DEPRECATED**: This package is no longer needed. Claude Code now has
> an official JSON Schema maintained by Anthropic at:
>
> ```
> https://json.schemastore.org/claude-code-settings.json
> ```
>
> Claude Code automatically validates your settings against this schema.
> No additional setup required.

## Migration

Remove any local schema files and update your settings:

```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "permissions": {
    "allow": ["Bash(git diff:*)"]
  }
}
```

## Official Schema

The official schema is maintained by Anthropic in the
[SchemaStore repository](https://github.com/SchemaStore/schemastore/blob/master/src/schemas/json/claude-code-settings.json).

---

_This package was created before the official schema existed. Thanks to
everyone who used it!_
