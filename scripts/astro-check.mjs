#!/usr/bin/env node
import { check } from '@astrojs/check';

process.exitCode = (await check({ root: process.cwd(), tsconfig: 'config/tsconfig.json' })) ? 1 : 0;
