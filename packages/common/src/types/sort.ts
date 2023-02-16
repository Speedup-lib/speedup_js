export enum SortOrder {
  /**
   * Ascending sort order
   */
  Ascending = 'ASC',

  /**
   * Descending sort order
   */
  Descending = 'DESC',
}

export type Sort<TField = string> = {
  /**
   * Field name
   */
  field: TField;

  /**
   * Sort order
   */
  order: SortOrder;
};
