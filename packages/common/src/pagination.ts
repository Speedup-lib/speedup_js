export interface PaginationRequest {
  /**
   * Where to start
   */
  page?: number;

  /**
   * How many objects to take
   */
  size?: number;
}

export interface PaginationResponse {
  /**
   * Total items available
   */
  totalItems: number;

  /**
   * Total pages available
   */
  totalPages: number;

  /**
   * Current page number
   */
  pageNumber: number;

  /**
   * Current page size
   */
  pageSize: number;
}

export interface CursorBasedPaginationRequest<TCursor = any> {
  /**
   * Current cursor
   */
  cursor?: TCursor;

  /**
   * How many objects to take/load
   */
  size?: number;
}

export interface CursorBasedPaginationResponse<TCursor = any> {
  /**
   * Current cursor
   */
  cursor?: TCursor;

  /**
   * How many objects to take/load
   */
  pageSize?: number;

  /**
   * Total items available
   */
  totalItems: number;

  /**
   * Total pages available
   */
  totalPages: number;
}

/**
 * Calculate skip/take parameters
 * @param page Page number (starts from 1)
 * @param size Items per page
 * @returns How many records to skip and take
 */
export const getSkipTake = (
  page: number,
  size: number,
): { skip: number; take: number } => {
  const skip = (page - 1) * size;
  const take = size;

  return { skip, take };
};

/**
 * Get total pages available
 * @param totalItems Total items available in the database
 * @param pageSize Items per each page
 * @returns Total number of pages available
 */
export const getTotalPages = (totalItems: number, pageSize: number): number => {
  // DM: bitwise OR to convert float to int
  const quotient = (totalItems / pageSize) | 0;
  const modulus = totalItems % pageSize;

  return quotient + (modulus > 0 ? 1 : 0);
};
