# Constellation Copilot Plugin

GitHub Copilot CLI plugin that adds Constellation code intelligence — skills, hooks, and the Constellation MCP server.

## Skill Reference

When working in this project, use the **`copilot-plugins`** skill for guidance on Copilot CLI plugin structure, `plugin.json` configuration, marketplace setup, and distribution.

## Structure

```
plugin.json               # Plugin manifest (name: "constellation")
skills/                   # 7 skills: architecture, deps, diagnose, impact-analysis, status, troubleshooting, unused
hooks/
├── hooks.json            # sessionStart + preToolUse hooks
├── inject.js             # sessionStart message injection
└── bash.js               # preToolUse parser nudging toward code_intel for grep/rg/glob/awk
.mcp.json                 # Constellation MCP server (npx @constellationdev/mcp@latest)
.github/plugin/
└── marketplace.json      # Marketplace manifest (name: "constellation-plugins")
```

## Key Conventions

- **Plugin manifest**: `plugin.json` at root — follows Copilot CLI plugin spec
- **Skills**: Subdirectories in `skills/` with `SKILL.md` — frontmatter uses `allowed-tools: code_intel` (bare, not array)
- **Hooks**: `hooks/hooks.json` declares events; logic lives in `hooks/*.js` invoked via `node`. Both `bash` and `powershell` commands are set so hooks run on macOS, Linux, and Windows.
- **Hook gating**: `inject.js` and `bash.js` no-op unless `CONSTELLATION_ACCESS_KEY` starts with `ak:`
- **MCP config**: `.mcp.json` — provides Constellation `code_intel` tool via stdio
- **Marketplace**: `.github/plugin/marketplace.json` — self-hosted marketplace for plugin distribution

## Common Tasks

| Task | Action |
|------|--------|
| Add skill | Create `skills/{name}/SKILL.md` with frontmatter |
| Add hook | Add event entry in `hooks/hooks.json`, implement logic in `hooks/*.js` |
| Add marketplace | `copilot plugin marketplace add ShiftinBits/constellation-copilot` |
| Install from marketplace | `copilot plugin install constellation@constellation-plugins` |
| Test locally (dev fallback) | `copilot plugin install ./constellation-copilot` |
| Verify loaded | `copilot plugin list`, `/skills list` |
| Reinstall after local changes | `copilot plugin install ./constellation-copilot` (cached) |
