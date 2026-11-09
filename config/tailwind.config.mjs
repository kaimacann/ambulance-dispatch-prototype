import { fileURLToPath } from 'node:url';

const palette = Object.fromEntries(
	Array.from({ length: 12 }, (_, index) => {
		const step = index + 1;
		return [step, `rgb(var(--primary-${step}) / <alpha-value>)`];
	}),
);

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
