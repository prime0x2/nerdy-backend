/**
 * Represents an application error with a specific HTTP status code and message.
 *
 * @example
 * ```javascript
 * throw new AppError(404, 'Resource not found');
 * ```
 *
 * Common HTTP status codes:
 *
 * - 400 - Bad Request
 * - 401 - Unauthorized
 * - 403 - Forbidden
 * - 404 - Not Found
 * - 409 - Conflict
 * - 429 - Too Many Requests
 * - 500 - Internal Server Error
 */
class AppError extends Error {
  statusCode: number;
  message: string;

  /**
   * Creates an instance of AppError.
   *
   * @param {number} statusCode - The HTTP status code.
   * @param {string} message - The error message.
   */
  constructor(statusCode: number, message: string) {
    super(message);

    this.statusCode = statusCode;
    this.message = message;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
