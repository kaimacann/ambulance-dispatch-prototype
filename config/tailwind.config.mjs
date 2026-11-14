/**
 * config/tailwind.config.mjs
 */

/*//////////////////////////////////////////////////
IMPORTS
//////////////////////////////////////////////////*/

// API
import { fileURLToPath } from 'node:url';

/*//////////////////////////////////////////////////
CONFIG
//////////////////////////////////////////////////*/

export default {
	content: [`${fileURLToPath(new URL('../src/', import.meta.url))}**/*.{astro,html,js,jsx,ts,tsx}`],
	theme: {
		extend: {
			colors: {
				primary: Object.fromEntries(
					Array.from({ length: 12 }, (_unused, i) => {
						const step = i + 1;
						return [step, `rgb(var(--primary-${step}) / <alpha-value>)`];
					}),
				),
			},
		},
	},
};
