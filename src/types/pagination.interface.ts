export interface PaginationRequest {
  pageSize: number;
  pageNumber: number;
  searchTerm?: string;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  items: T[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
