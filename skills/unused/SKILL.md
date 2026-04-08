---
name: unused
description: >
  Use when finding dead code, orphaned exports, or unused functions/classes.
  Identifies exported symbols that are never imported anywhere in the codebase.
  Triggers for: "dead code", "unused exports", "orphaned code",
  "find unused functions", "clean up dead code"
allowed-tools: ["constellation/code_intel"]
---

# Find Orphaned/Dead Code

Find exported code that is never imported or used anywhere in the codebase.

**Arguments (provided by the user in natural language):**
- Optional filter by symbol kind: function, class, type, interface, or variable

**Construct the API call:**
- If no kind filter specified: call with no filter
- If a kind is specified: pass it as an array element

Call `code_intel`:

```javascript
// kindFilter = user's specified kind (may be empty)
const kindFilter = "<kind-if-specified>";
const params = kindFilter ? { filterByKind: [kindFilter] } : {};
const result = await api.findOrphanedCode(params);
return result;
```

**If orphaned code is found**, present:
1. **Summary**: Total count of orphaned exports, broken down by kind (function, class, etc.)
2. **Files with Most Orphans**: Group results by file, sorted by count (show top 20)
3. **For Each File**: List the orphaned symbol names, kinds, and line numbers

**Recommendations to include:**
- Review each orphaned export to confirm it's truly unused
- Some may be entry points or dynamically imported
- Consider removing confirmed dead code to reduce maintenance burden
- Focus on files with multiple orphans first

**If no orphans found**, congratulate the user on a clean codebase.

**If error**, explain the error and provide guidance from the error response.
