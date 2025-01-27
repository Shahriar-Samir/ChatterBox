import { Response } from 'express';
import TSendResponse from '../../types/TSendResponse';

const sendResponse = <T>(res: Response, data: TSendResponse<T>) => {
  res.status(data.status).json({
    success: true,
    status: data.status,
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;
