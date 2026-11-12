/**
 * astro.config.mjs
 */

/*//////////////////////////////////////////////////
IMPORTS
//////////////////////////////////////////////////*/

// API
import react from '@astrojs/react';
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import { terraErrorBoundaryIntegration as __terraErrorBoundaryIntegration } from '@terra-symposium/standards-quality/astro-integration';
export default defineConfig({
	server: { port: 3000, strictPort: true },
	output: 'static',
	integrations: [__terraErrorBoundaryIntegration(), react()],
	vite: { css: { postcss: fileURLToPath(new URL('./config/', import.meta.url)) } },
});
