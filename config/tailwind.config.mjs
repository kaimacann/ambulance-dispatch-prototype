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

const palette = Object.fromEntries(Array.from({ length: 12 }, toPaletteEntry));

/*//////////////////////////////////////////////////
HELPERS
//////////////////////////////////////////////////*/

/**
 * Maps each Tailwind palette iteration to its CSS-variable color token.
 *
 * @param _unused Placeholder value supplied by `Array.from` for each entry.
 * @param i Zero-based palette index.
 *
 * @return Palette step and CSS-variable color expression.
 */
function toPaletteEntry(_unused, i) {
	const step = i + 1;
	return [step, `rgb(var(--primary-${step}) / <alpha-value>)`];
}
export default {
	content: [`${fileURLToPath(new URL('../src/', import.meta.url))}**/*.{astro,html,js,jsx,ts,tsx}`],
	theme: {
		extend: {
			colors: {
				primary: palette,
			},
		},
	},
};
