#!/bin/bash
# Nudge toward code_intel for structural queries.
# Copilot's preToolUse fires for ALL tools (no tool-name matcher).
# Output the nudge unconditionally — it's low-cost instructional text
# and only relevant when the model is about to do a text search.
cat <<'EOF'
For structural code questions—symbol definitions, callers/callees, dependencies, dependents, impact analysis, architecture overview—use code_intel instead of search. It answers in one call what would take 3-5 text searches. Use search only for literal string search, config values, or when code_intel is unavailable or you find the index to be outdated for your query.
EOF
