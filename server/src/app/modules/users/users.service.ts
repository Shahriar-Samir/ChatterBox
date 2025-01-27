import { TUser } from './users.interface';
import UserModel from './users.model';

const getSingleUserFromDB = async (uid: string) => {
  const result = await UserModel.findOne({ uid, isDeleted: false });
  return result;
};

const createUserIntoDB = async (payload: TUser) => {
  const result = await UserModel.create(payload);
  return result;
};

const updateUserInDB = async (payload: TUser) => {
  const result = await UserModel.updateOne(payload);
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
  updateUserInDB,
  deleteUserFromDB,
};
