export interface Pagination {
    currentPage: number;
    imtesPerpage: number;
    totalItems: number;
    totalPages: number;
}

export class PaginatedResult<T> {
    result: T;
    pagination: Pagination;
}