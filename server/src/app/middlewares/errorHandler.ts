import { ErrorRequestHandler, NextFunction } from 'express';

const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next: NextFunction,
) => {
  let statusCode = err.status || 500;
  let message = err.message || 'Something went wrong';

  res.status(statusCode).json({ success: false, message });
};

export default globalErrorHandler;
