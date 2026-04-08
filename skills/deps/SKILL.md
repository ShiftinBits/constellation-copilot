---
name: deps
description: >
  Use when analyzing file dependencies, checking for circular dependencies,
  or understanding what depends on a file. Supports forward (what does this
  file use?) and reverse (what uses this file?) analysis. Triggers for:
  "dependencies of X", "what imports this", "circular dependencies",
  "what depends on X", "dependency graph"
allowed-tools: ["constellation/code_intel"]
---

# Dependency Analysis

Analyze dependencies for the specified file.

**Arguments (provided by the user in natural language):**
- File path (required) — the file to analyze
- Direction: "reverse" or "what depends on this" — to show dependents instead of dependencies

If no file path is provided, ask the user what file they want to analyze.

**For dependencies (default, forward analysis):**

Call `code_intel` with this code parameter:

```javascript
const [deps, circles] = await Promise.all([
  api.getDependencies({ filePath: "<file-path>", depth: 2, includePackages: true }),
  api.findCircularDependencies({ filePath: "<file-path>", maxDepth: 5 })
]);
return { dependencies: deps, circularDependencies: circles };
```

Present:
1. **Summary**: Count of internal vs external dependencies
2. **Internal Dependencies**: Each file and what symbols are imported from it
3. **External Packages**: List of npm packages used
4. **Circular Dependencies**: If any cycles detected, show severity and the cycle path

**For dependents (reverse analysis):**

Call `code_intel` with this code parameter:

```javascript
const result = await api.getDependents({ filePath: "<file-path>", depth: 2 });
return result;
```

Present:
1. **Summary**: How many files depend on this one
2. **Dependents**: Each file and what it imports from this file
3. **Note**: Suggest reviewing these files if planning changes

Highlight any circular dependencies as potential issues to address.
