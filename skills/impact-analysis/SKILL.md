---
name: impact-analysis
description: >
  Use when analyzing the impact of changing, renaming, or deleting a symbol.
  Provides risk assessment, blast radius, affected files, test exposure, and
  recommendations. Triggers for: "impact of changing X", "what would break if
  I modify X", "blast radius", "risk of renaming X", "safe to delete X"
allowed-tools: code_intel
---

# Impact Analysis

Analyze the impact of changing the specified symbol.

**Arguments (provided by the user in natural language):**
- Symbol name (required) — the function, class, or variable to analyze
- File path (optional) — helps disambiguate if multiple symbols share the same name

If no symbol name is provided, ask the user what symbol they want to analyze.

Call `code_intel` with this code parameter:

```javascript
const result = await api.impactAnalysis({
  symbolName: "<symbol-name>",
  filePath: "<file-path>" || undefined,
  depth: 3
});
return result;
```

**If successful**, present:
1. **Symbol**: Name, kind (function/class/etc), and location
2. **Risk Assessment**: Risk level from result.data.breakingChangeRisk.riskLevel (low/medium/high/critical) and contributing factors
3. **Impact Scope**: Files and dependents affected from result.data.summary (impactedFileCount, directDependentCount), whether it's exported (result.data.symbol.isExported)
4. **Direct Dependents**: Top 10 from result.data.directDependents
5. **Test Exposure**: Impacted test files vs production files from result.data.summary (testFileCount, productionFileCount)
6. **Recommendations**: From result.data.breakingChangeRisk.recommendations

**If high or critical risk**, emphasize caution and suggest reviewing dependents before making changes.

**If error**, explain the error and provide guidance from the error response.
