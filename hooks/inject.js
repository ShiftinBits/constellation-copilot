'use strict';

if (!process.env.CONSTELLATION_ACCESS_KEY?.startsWith('ak:')) process.exit(0);

const hookEventName = process.argv[2];

const hookMessages = {
	sessionStart: 'You have access to the code_intel source code intelligence tool, this should be your preferred tool for searching or navigating the code base (finding definitions or references, impact analysis, architecture details, etc.). Other search tools (e.g. grep, glob, awk, rg) should be used for literal text search or as a fallback.'
};

const message = hookMessages[hookEventName];
if (!message) process.exit(0);

process.stdout.write(`${message}\n`);
