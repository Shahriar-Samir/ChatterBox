import TJwtPayload from '../../types/TJWTPayload';
import config from '../config';
import jwt from 'jsonwebtoken';

export const generateAccessToken = (payload: TJwtPayload) => {
  return jwt.sign(payload, config.secret as string, { expiresIn: '24h' });
};
