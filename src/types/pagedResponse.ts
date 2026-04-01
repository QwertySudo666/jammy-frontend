export interface PagedResponse<T> {
    data: T[];          // Твій List<T> data
    totalCount: number; // long totalCount
    page: number;       // int page
    size: number;       // int size
    pagesCount: number; // int pagesCount
}