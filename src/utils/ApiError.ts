/**
 * @description Common Error class to throw an error from anywhere.
 * The {@link errorHandler} middleware will catch this error at the central place and return an appropriate response to the client.
 */
export class ApiError extends Error {
  statusCode: number;
  data: any;
  success: boolean;
  errors: { message: string }[];

  constructor(
    statusCode: number,
    message: string = 'Something went wrong',
    errors: { message: string }[] = [],
    stack?: string,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    }
    Error.captureStackTrace(this, this.constructor);
  }
}
