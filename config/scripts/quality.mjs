#!/usr/bin/env node

/*//////////////////////////////////////////////////
IMPORTS
//////////////////////////////////////////////////*/

// API
import { fileURLToPath } from 'node:url';
import { runQualityFromCfg } from '@terra-symposium/standards-quality/cli';

/*//////////////////////////////////////////////////
CONFIG
//////////////////////////////////////////////////*/

const config = fileURLToPath(new URL('../quality.json', import.meta.url));
await runQualityFromCfg(config, process.argv.slice(2));
