export interface ListResponse<T> {
  data: T[];
  errorMessage: string;
  pageCount: number;
  totalRow: number;
  succeed: boolean;
  pagination: PaginationParams;
}
export interface PaginationParams {
  _limit: number;
  _page: number;
  _totalRows: number;
}
export interface ListParams {
  _page?: any;
  _pageSize?: any;
  pageCount?: number;
  sort?: string;
  header_like?: string;
  order?: 'asc' | 'desc';
  [key: string]: any;
}

export interface ResponseMessage<T> {
  data: T;
  errorMessage?: any;
  succeed: boolean;
}
