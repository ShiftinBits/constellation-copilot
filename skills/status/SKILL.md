---
name: status
description: >
  Use when checking Constellation API connectivity, authentication status,
  or verifying the code intelligence service is running. Triggers for:
  "is Constellation connected", "check API status", "verify authentication",
  "constellation status", "is code_intel working"
allowed-tools: ["constellation/code_intel"]
---

# Constellation Status Check

Check the Constellation API connection status by calling `code_intel` with this code parameter:

```javascript
const result = await api.ping();
return result;
```

**If successful** (result.pong === true), report:
- Status: Connected
- Authentication valid, project access confirmed
- Note: Use a Constellation diagnose check or `api.getCapabilities()` to check indexing status

**If error** (result.success is false), report based on error code:

| Error Code | Response |
|------------|----------|
| `AUTH_ERROR` | "Status: Auth Failed - Run `constellation auth` to configure credentials" |
| `PROJECT_NOT_REGISTERED` | "Status: Project Not Found - Verify project ID or check organization access" |
| `PROJECT_INACTIVE` | "Status: Project Inactive - Project has been deactivated" |
| `API_UNREACHABLE` | "Status: API Offline - Check network connectivity and API URL in constellation.json" |
| Other codes | Show error code, message, and guidance from result.error |
| Missing error object | Note "Unexpected response structure" and show raw result |

**If the tool call fails entirely**, report:
- Status: MCP Unreachable
- The Constellation MCP server is not running or not configured
- Suggest: Restart the editor/CLI or run a Constellation diagnose check for details

Keep the response brief and actionable.
