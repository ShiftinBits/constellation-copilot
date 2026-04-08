---
name: troubleshooting
description: >
  Use when the user encounters Constellation errors, connection issues, or
  needs help debugging code intelligence problems. Triggers for:
  "Constellation errors", "fix Constellation", "debug Constellation",
  "Constellation not working", "API connection issues", "indexing problems",
  "MCP server issues", error codes like AUTH_ERROR, PROJECT_NOT_INDEXED
---

# Constellation Troubleshooting

Quick diagnostic procedures for Constellation plugin issues.

## Quick Diagnosis Flowchart

```
Issue Reported
     |
     v
Can code_intel be called?
     |                    |
    YES                   NO
     |                    |
     v                    v
  API Error          MCP Server Issue
 (has code)         (see MCP Diagnosis)
     |
     v
Check error.code:
- AUTH_ERROR --> Authentication section
- PROJECT_NOT_INDEXED --> Indexing section
- SYMBOL_NOT_FOUND --> Query Issues section
- API_UNREACHABLE --> Connectivity section
```

## MCP Server Issues

**Symptom:** Tool calls to code_intel fail entirely, or "Failed to reconnect" messages.

**Cause:** The MCP server isn't starting or is crashing.

**Quick Fixes:**

1. **Restart the editor/CLI** - MCP connections initialize at startup

2. **Verify .mcp.json configuration:**

   ```json
   {
     "mcpServers": {
       "constellation": {
         "type": "stdio",
         "command": "npx",
         "args": ["-y", "@constellationdev/mcp@latest"]
       }
     }
   }
   ```

## Authentication Issues (AUTH_ERROR)

**Symptom:** "Authentication failed" or "Invalid API key"

**Quick Fixes:**

1. **Configure credentials:**

   ```bash
   constellation auth
   ```

2. **Check if key is set:**

   ```bash
   echo $CONSTELLATION_ACCESS_KEY
   ```

3. **If key is expired:** Regenerate in Constellation web UI under Settings > API Keys

## Indexing Issues (PROJECT_NOT_INDEXED)

**Symptom:** "Project not indexed" or empty results

**Quick Fixes:**

1. **Index the project:**

   ```bash
   cd /path/to/your/project
   constellation index --full
   ```

2. **Force reindex if stale:**

   ```bash
   constellation index --full --force
   ```

## Connectivity Issues (API_UNREACHABLE)

**Symptom:** Timeout or connection refused

**Quick Fixes:**

1. **Check network connectivity**

2. **Check Constellation status at https://status.constellationdev.io/**

## Query Issues (SYMBOL_NOT_FOUND, FILE_NOT_FOUND)

These are typically **not errors** - the item simply wasn't found in the index.

**Troubleshooting:**

1. Try partial/broader search terms
2. Check spelling and case sensitivity
3. Verify the file extension is in configured languages
4. Re-index if the file was recently added

## Diagnostic Check

Ask Copilot to run a Constellation health check for a quick status report that tests:
- MCP server connectivity
- API authentication
- Project indexing status

See `references/error-codes.md` for complete error code documentation.
