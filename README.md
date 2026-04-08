# <img src="https://constellationdev.io/copilot-icon.svg" height="30"> Constellation Plugin for GitHub Copilot

[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL--3.0-3DA639?logo=opensourceinitiative&logoColor=white)](LICENSE)

While Constellation's MCP server provides raw code intelligence capabilities, this plugin enhances your GitHub Copilot experience with:

| Feature | Benefit |
|---------|---------|
| **Contextual Skills** | Copilot automatically loads relevant knowledge when needed |
| **Proactive Agents** | Copilot suggests analysis before you make risky changes |
| **Safety Hooks** | Reminders to check impact before modifying code |

## Features

### Skills

Copilot automatically activates specialized analysis based on your questions:

| Skill | Triggers When You Ask About... |
|-------|-------------------------------|
| **status** | API connectivity, authentication, service health |
| **diagnose** | Health checks, indexing status, connectivity issues |
| **impact** | Impact of changes, blast radius, risk assessment |
| **deps** | File dependencies, circular dependencies, module coupling |
| **unused** | Dead code, orphaned exports, unused functions |
| **architecture** | Codebase structure, language distribution, project overview |
| **troubleshooting** | Error codes, debugging, connection problems |

### Agents

Specialized AI agents for autonomous analysis:

| Agent | Purpose |
|-------|---------|
| **source-scout** | Explores and navigates codebase, discovers symbols and architectural patterns |
| **impact-investigator** | Proactively assesses risk before refactoring, renaming, or deleting code |
| **dependency-detective** | Detects circular dependencies and unhealthy coupling patterns |

**Example Trigger:**
```
You: "Rename AuthService to AuthenticationService"
Copilot: "Before renaming, let me analyze the potential impact..."
[Launches impact-investigator agent]
```

### Hooks

Event hooks enable intelligent, transparent assistance:

| Hook | Event | Behavior |
|------|-------|----------|
| **Code Intel Preference** | `sessionStart` | Establishes code_intel as the primary tool for code understanding |
| **Search Nudge** | `preToolUse` | Reminds to prefer code_intel over grep for structural queries |

## Installation

### Prerequisites

1. **Constellation Account** (see [Constellation](https://app.constellationdev.io))
2. **Project indexed** in Constellation
3. **Access key** configured
4. **GitHub Copilot** subscription (CLI or VS Code)

### Quick Start

**Install the plugin directly from GitHub:**
```bash
# Install the plugin
copilot plugin install ShiftinBits/constellation-copilot
```

### Uninstall

```bash
copilot plugin uninstall constellation
```
### Check Your Setup

Call the `status` command on the constellation plugin within Copilot:
```
/constellation:status
```

Example result:
```
• Status: Connected /
   - API Connection: Active
   - Authentication: Valid
   - Project Access: Confirmed
   - Last Indexed: 2026-04-07 at 22:42:17 UTC
   - Response Time: 569ms

The Constellation code intelligence service is running and fully operational. To check indexing status and available capabilities, use api.getCapabilities().
```

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| `AUTH_ERROR` | Check `CONSTELLATION_ACCESS_KEY` is set correctly, use `constellation auth` CLI command to set |
| `PROJECT_NOT_INDEXED` | Run `constellation index --full` in your project |
| Skills not activating | Restart the CLI/editor or reinstall the plugin |
| Changes not taking effect | Plugin components are cached — uninstall and reinstall: `copilot plugin uninstall constellation && copilot plugin install ./path` |

## Documentation

- [Constellation Documentation](https://docs.constellationdev.io) — Full platform documentation
- [Copilot CLI Plugins](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/plugins-creating) — Plugin development guide

## License

GNU Affero General Public License v3.0 (AGPL-3.0)

Copyright (c) 2026 ShiftinBits Inc.

See [LICENSE](LICENSE) file for details.
