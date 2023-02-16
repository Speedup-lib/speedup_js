export type Event<TEventType = string, TBody = any, TTimestamp = Date> = {
  /**
   * Event type
   */
  event: TEventType;

  /**
   * When the event occurred
   */
  timestamp: TTimestamp;
} & TBody;
