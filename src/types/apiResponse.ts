export interface PagedResponse<T> {
    data: T[];
    totalCount: number;
    page: number;
    size: number;
    pagesCount: number;
}