export type Event<TType = string, TBody = any, TTimestamp = Date> = {
  /**
   * Event type
   */
  type: TType;

  /**
   * When the event occurred
   */
  timestamp: TTimestamp;
} & TBody;
