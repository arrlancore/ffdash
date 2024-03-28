export interface CommonResponse<T> {
	result: Array<T>;
	count: number;
}

export interface PaginationOptions<Filter> {
	pagination?: { page: number; pageSize: number };
	search?: string;
	filter?: Filter;
}
