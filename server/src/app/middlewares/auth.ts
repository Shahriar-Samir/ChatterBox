import TJwtPayload from '../../types/TJWTPayload';
import config from '../config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../util/catchAsync';
import { Request, Response, NextFunction } from 'express';

// Extend Express Request type to include "user"
interface AuthenticatedRequest extends Request {
  user?: JwtPayload | string;
}

export const generateAccessToken = (payload: TJwtPayload) => {
  return jwt.sign(payload, config.secret as string, { expiresIn: '24h' });
};

export const validateAccessTokenWithUID = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token;
    const isUidExist = req.body.uid || req.params.uid || req.query.uid;

    if (!token) {
      throw new Error('Unauthorized access');
    }

    if (!isUidExist) {
      throw new Error('Unauthorized access');
    }

    jwt.verify(token, config.secret as string, (err: any, decoded: any) => {
      if (err) {
        throw new Error('Unauthorized access');
      }
      if (decoded.uid !== isUidExist) {
        throw new Error('Unauthorized access');
      }
      req.user = decoded as JwtPayload;
      next();
    });
  },
);

export const validateAccessTokenForAuth = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token;

    if (!token) {
      res.json({
        success: false,
        status: 401,
        message: 'Unauthorized access',
      });
    }

    jwt.verify(token, config.secret as string, (err: any, decoded: any) => {
      if (err) {
        res.json({
          success: false,
          status: 401,
          message: 'Unauthorized access',
        });
      }
      req.user = decoded as JwtPayload;
      next();
    });
  },
);
