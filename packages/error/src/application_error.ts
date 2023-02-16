export interface ApplicationErrorConstructorOptions<
  TCauseError extends Error = Error,
> {
  /**
   * Error code
   */
  code?: string;

  /**
   * The cause of this error (or the parent error)
   */
  cause?: TCauseError;
}

export class ApplicationError<TCause extends Error = Error> extends Error {
  /**
   * Error code (e.g. E_APPLICATION_ERROR)
   */
  public readonly code: string;

  /**
   * The cause of this error (or the parent error)
   */
  public readonly cause?: Error;

  /**
   *
   * @param message Custom error message
   * @param opts Extra options
   */
  constructor(
    message?: string,
    opts?: ApplicationErrorConstructorOptions<TCause>,
  ) {
    message = message ?? 'ApplicationError';

    super(message);

    this.code = opts?.code ?? 'E_APPLICATION_ERROR';
    this.cause = opts?.cause;

    this.configureSubError(ApplicationError);
  }

  /**
   * Configure sub error
   * @param fn Constructor of the error
   */
  protected configureSubError(fn: Function) {
    this.captureStackTrace(fn);
    this.setPrototypeOf(fn);
  }

  /**
   * Capture stack trace in the error
   * @param fn Constructor of the error
   */
  private captureStackTrace(fn: Function) {
    Error.captureStackTrace(this, fn);
  }

  /**
   * Set prototype of the object to enable instanceOf operator
   * @param fn Constructor of the error
   */
  private setPrototypeOf(fn: Function) {
    Object.setPrototypeOf(this, fn.prototype);
  }
}
