import { PaginationMeta } from './paginationMeta';

export interface PaginationResult<T> {
	meta: PaginationMeta;
	body: T[];
}
