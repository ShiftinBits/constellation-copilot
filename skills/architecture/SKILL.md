---
name: architecture
description: >
  Use when getting a high-level overview of codebase architecture, project
  structure, language distribution, or understanding how the codebase is
  organized. Triggers for: "architecture overview", "codebase structure",
  "project summary", "language distribution", "how is this organized"
allowed-tools: ["constellation/code_intel"]
---

# Architecture Overview

Retrieve a high-level architectural overview of the codebase.

Call `code_intel` with this code parameter:

```javascript
const result = await api.getArchitectureOverview({ includeMetrics: true, includeModuleGraph: false });
return result;
```

**Present the following:**

1. **Project Summary**
   - Project name
   - Total files and total symbols
   - Supported languages

2. **Language Distribution**
   - For each language in result.data.metrics.byLanguage, show:
     - Language name
     - File count
     - Symbol count
     - Percentage of codebase

3. **Symbol Breakdown**
   - Top 10 symbol kinds from result.data.metrics.byKind (functions, classes, interfaces, etc.)
   - Show count for each

4. **Key Directories**
   - Top 10 directories by symbol count from result.data.structure
   - These represent the main modules/areas of the codebase

5. **Observations** (optional insights):
   - Note if it's heavily function-based vs class-based
   - Multi-language codebase characteristics
   - Relative size of different areas

Keep the output concise and scannable. Focus on giving a quick mental model of the codebase structure.
