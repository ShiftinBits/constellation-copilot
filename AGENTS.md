# Constellation Copilot Plugin

GitHub Copilot CLI plugin that adds Constellation code intelligence — agents, skills, hooks, and the Constellation MCP server.

## Skill Reference

When working in this project, use the **`copilot-plugins`** skill for guidance on Copilot CLI plugin structure, plugin.json configuration, marketplace setup, and distribution.

## Structure

```
plugin.json               # Plugin manifest (name: "constellation")
agents/                   # 3 agents: source-scout, impact-investigator, dependency-detective
skills/                   # 7 skills: architecture, deps, diagnose, impact, status, troubleshooting, unused
hooks/
├── hooks.json            # sessionStart + preToolUse hooks
└── scripts/
    ├── session-start.sh  # Injects code_intel preference at session start
    └── pre-tool-use.sh   # Nudges toward code_intel for structural queries
.mcp.json                 # Constellation MCP server (npx @constellationdev/mcp@latest)
.github/plugin/
└── marketplace.json      # Marketplace manifest (name: "constellation-plugins")
```

## Key Conventions

- **Plugin manifest**: `plugin.json` at root — follows Copilot CLI plugin spec
- **Agents**: `*.agent.md` in `agents/` — YAML frontmatter with `name`, `description`, `tools`
- **Skills**: Subdirectories in `skills/` with `SKILL.md` — same format as Claude Code skills
- **Hooks**: `hooks/hooks.json` — `sessionStart` and `preToolUse` events run shell scripts
- **MCP config**: `.mcp.json` — provides Constellation `code_intel` tool via stdio
- **Tool references**: Copilot CLI uses `grep` (not `Grep`), `view` (not `Read`), `edit` (not `Edit`), `glob` (not `Glob`) — agent tool lists must use Copilot CLI tool names
- **Marketplace**: `.github/plugin/marketplace.json` — self-hosted marketplace for plugin distribution

## Common Tasks

| Task | Action |
|------|--------|
| Add agent | Create `agents/{name}.agent.md` with frontmatter |
| Add skill | Create `skills/{name}/SKILL.md` with frontmatter |
| Add hook | Add event entry in `hooks/hooks.json`, script in `hooks/scripts/` |
| Add marketplace | `copilot plugin marketplace add ShiftinBits/constellation-copilot` |
| Install from marketplace | `copilot plugin install constellation@constellation-plugins` |
| Test locally (dev fallback) | `copilot plugin install ./constellation-copilot` |
| Verify loaded | `copilot plugin list`, `/agent`, `/skills list` |
| Reinstall after local changes | `copilot plugin install ./constellation-copilot` (cached) |

## Agent Tool Mapping

Copilot CLI tools differ from Claude Code tools:

| Claude Code | Copilot CLI | Notes |
|-------------|-------------|-------|
| `Read` | `view` | File reading |
| `Edit` | `edit` | File editing |
| `Write` | `create` | New file creation |
| `Grep` | `grep` (or `rg`) | Content search |
| `Glob` | `glob` | File pattern matching |
| `Bash` | `bash` | Shell commands |
| `constellation/*` | `constellation/*` | MCP tools (same) |
