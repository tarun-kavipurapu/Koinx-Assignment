import mongoose from 'mongoose';
import { ApiError } from '../utils/ApiError';
import { asyncHandler } from '../utils/AsyncHandler';
import { NextFunction, Request, Response } from 'express';

/**
 *
 * @param {Error | ApiError} err
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 *
 * @description This middleware is responsible for catching the errors from any request handler wrapped inside the {@link asyncHandler}
 */
const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let error: ApiError;

  // Check if the error is an instance of ApiError
  if (err instanceof ApiError) {
    error = err;
  } else {
    // Assign an appropriate status code
    const statusCode =
      'statusCode' in err || err instanceof mongoose.Error ? 400 : 500;

    // Set a message from the native Error instance or a custom one
    const message = err.message || 'Something went wrong';

    // Create a new ApiError instance to maintain consistency
    const errors = 'errors' in err ? (err as any).errors : [];
    error = new ApiError(statusCode, message, errors, err.stack);
  }

  // Now we are sure that the `error` variable will be an instance of ApiError
  const response = {
    success: error.success,
    statusCode: error.statusCode,
    message: error.message,
    errors: error.errors,
    ...(process.env.NODE_ENV === 'development' ? { stack: error.stack } : {}),
  };

  // Send error response
  return res.status(error.statusCode).json(response);
};

export { errorHandler };
