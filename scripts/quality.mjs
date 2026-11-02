#!/usr/bin/env node
import { runQualityFromCfg } from '@terra-symposium/quality/cli';
import { fileURLToPath } from 'node:url';

const config = fileURLToPath(new URL('../config/quality.json', import.meta.url));
runQualityFromCfg(config, process.argv.slice(2));
