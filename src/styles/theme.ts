'use client';

import { createTheme } from '@mantine/core';

export const theme = createTheme({
	fontFamily: 'Work Sans',
	headings: {
		fontFamily: 'Work Sans, sans-serif',
	},
	colors: {
		emerald: [
			'#f0fdf5',
			'#dcfce8',
			'#bbf7d1',
			'#86efad',
			'#4ade80',
			'#22c55e',
			'#16a34a',
			'#15803c',
			'#166533',
			'#14532b',
			'#052e14',
		],
		skyblue: [
			'#e1f9ff',
			'#ccedff',
			'#9ad7ff',
			'#64c1ff',
			'#3baefe',
			'#20a2fe',
			'#099cff',
			'#0088e4',
			'#0078cd',
			'#0069b6',
		],
		bg: [
			'#f5f5f5',
			'#e7e7e7',
			'#cdcdcd',
			'#b2b2b2',
			'#9a9a9a',
			'#8b8b8b',
			'#848484',
			'#717171',
			'#656565',
			'#575757',
		],
	},
	primaryColor: 'skyblue',
	defaultRadius: 'md',
});
