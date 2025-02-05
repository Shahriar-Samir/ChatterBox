import TJwtPayload from '../../../types/TJWTPayload';
import UserModel from '../users/users.model';
import bcrypt from 'bcrypt';
import TLogin from './auth.interface';
import { generateAccessToken } from '../../middlewares/auth';

const login = async (payload: TLogin) => {
  const user = await UserModel.findOne({ email: payload.email });
  if (!user) {
    throw new Error('User not found');
  }

  if (user.isDeleted) {
    throw new Error('User is no longer available');
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password,
  );

  if (!isPasswordMatched) {
    throw new Error('Invalid email or password');
  }

  const jwtPayload: TJwtPayload = {
    email: user.email,
    uid: user.uid,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  const accessToken = generateAccessToken(jwtPayload);
  return { accessToken };
};

export default {
  login,
};
