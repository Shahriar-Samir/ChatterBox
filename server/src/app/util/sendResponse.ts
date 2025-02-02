import { Response } from 'express';
import TSendResponse, {
  TSendResponseWithCookie,
  TSendResponseWithRemovingCookie,
} from '../../types/TSendResponse';
import config from '../config';

const cookieOptions: {
  httpOnly: boolean;
  secure: boolean;
  sameSite: 'none' | 'strict' | 'lax';
} = {
  httpOnly: true,
  secure: config.node_env === 'production',
  sameSite: config.node_env === 'production' ? 'none' : 'strict',
};

const sendResponse = <T>(res: Response, data: TSendResponse<T>) => {
  res.status(data.status).json({
    success: true,
    status: data.status,
    message: data.message,
    data: data.data,
  });
};

export const sendResponseSettingCookies = (
  res: Response,
  data: TSendResponseWithCookie,
) => {
  res
    .status(data.status)
    .cookie('access_token', data?.data?.accessToken, cookieOptions)
    .json({
      success: true,
      status: data.status,
      message: data.message,
    })
    .send();
};

export const sendResponseRemovingCookies = (
  res: Response,
  data: TSendResponseWithRemovingCookie,
) => {
  res
    .status(data.status)
    .clearCookie('access_token', { maxAge: 0, ...cookieOptions })
    .json({
      success: true,
      status: data.status,
      message: data.message,
    })
    .send();
};

export default sendResponse;
