import react from '@astrojs/react';
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
	output: 'static',
	integrations: [react()],
	vite: { css: { postcss: fileURLToPath(new URL('./', import.meta.url)) } },
});
