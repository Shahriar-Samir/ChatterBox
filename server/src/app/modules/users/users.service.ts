import config from '../../config';
import IdGenerator from '../../util/IdGenerator';
import { TUser } from './users.interface';
import UserModel from './users.model';
import bcrypt from 'bcrypt';

const getSingleUserFromDB = async (uid: string) => {
  const result = await UserModel.findOne({ uid, isDeleted: false });
  return result;
};

const createUserIntoDB = async (payload: TUser) => {
  const uid = await IdGenerator('user');
  console.log(uid);
  payload.uid = uid as string;
  const result = await UserModel.create(payload);
  return result;
};

const updateUserInfoInDB = async (uid: string, payload: TUser) => {
  const result = await UserModel.updateOne(
    { uid, isDeleted: false },
    {
      firstName: payload.firstName,
      lastName: payload.lastName,
    },
  );
  return result;
};

const updateUserPasswordInDB = async (
  uid: string,
  payload: { password: string },
) => {
  const hashedPass = await bcrypt.hash(
    payload.password,
    config.saltRounds as number,
  );
  payload.password = hashedPass;
  const result = await UserModel.updateOne(
    { uid, isDeleted: false },
    {
      password: payload.password,
    },
  );
  return result;
};

const deleteUserFromDB = async (uid: string) => {
  const result = await UserModel.updateOne(
    { uid, isDeleted: false },
    { isDeleted: true },
  );
  return result;
};

export default {
  getSingleUserFromDB,
  createUserIntoDB,
  updateUserInfoInDB,
  updateUserPasswordInDB,
  deleteUserFromDB,
};
