import { ColumnFilter } from '@tanstack/react-table';

export const columnFiltersToObject = (filters: ColumnFilter[]) => {
	return filters.reduce(
		(acc, obj) => {
			acc[obj.id] = typeof obj.value === 'number' ? (obj.value as number) : (obj.value as string);

			return acc;
		},
		{} as { [key: string]: string | number },
	);
};
