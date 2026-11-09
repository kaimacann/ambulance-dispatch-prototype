import react from '@astrojs/react';
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
	server: { port: 3000, strictPort: true },
	output: 'static',
	integrations: [react()],
	vite: {
		css: { postcss: fileURLToPath(new URL('./', import.meta.url)) },
		environments: { prerender: { resolve: { noExternal: ['@astrojs/react'] } } },
	},
});
