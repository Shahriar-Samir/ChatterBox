import { NextFunction } from 'express';

const pageNotFoundHandler = (req, res, next: NextFunction) => {
  const status = 404;
  const message = 'page not found';
  res.status(status).json({
    success: false,
    status,
    message,
  });
};

export default pageNotFoundHandler;
