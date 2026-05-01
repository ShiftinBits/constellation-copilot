'use strict';

if (!process.env.CONSTELLATION_ACCESS_KEY?.startsWith('ak:')) process.exit(0);

const TRIGGER_REGEX = /\b(?:grep|rg|glob|awk|findstr)\b/i;
const DIRECT_SEARCH_TOOLS = new Set(['grep', 'rg', 'glob', 'awk']);
const REMINDER = 'Use the code_intel tool before other tools for searching or navigating the codebase. Other search tools (e.g. grep, glob, awk, rg) should be used for literal text search or as a fallback.';

async function readStdin() {
	let input = '';
	for await (const chunk of process.stdin) input += chunk;
	return input;
}

function extractCommand(inputData) {
	const rawToolArgs = inputData?.toolArgs;
	if (typeof rawToolArgs === 'string') {
		try {
			const parsed = JSON.parse(rawToolArgs);
			if (typeof parsed?.command === 'string') return parsed.command;
		} catch {}
	}

	const fallbackCandidates = [
		inputData?.tool_input?.command,
		inputData?.toolInput?.command,
		inputData?.command,
		inputData?.input?.command,
	];

	for (const candidate of fallbackCandidates) {
		if (typeof candidate === 'string') return candidate;
	}

	return '';
}

function extractToolName(inputData) {
	const candidates = [
		inputData?.toolName,
		inputData?.tool_name,
		inputData?.tool,
		inputData?.name,
	];

	for (const candidate of candidates) {
		if (typeof candidate === 'string' && candidate.length) return candidate.toLowerCase();
	}

	return '';
}

async function main() {
	const input = await readStdin();
	if (!input) return;

	let inputData;
	try {
		inputData = JSON.parse(input);
	} catch {
		return;
	}

	const toolName = extractToolName(inputData);
	if (DIRECT_SEARCH_TOOLS.has(toolName)) {
		process.stdout.write(`${REMINDER}\n`);
		return;
	}

	if (toolName && toolName !== 'bash') return;

	const command = extractCommand(inputData);
	if (!command || !TRIGGER_REGEX.test(command)) return;

	process.stdout.write(`${REMINDER}\n`);
}

main();
