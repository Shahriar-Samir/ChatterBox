import UserModel from '../users/users.model';

const login = async (payload: any) => {
  const user = await UserModel.findOne({ email: payload.email });
  if (!user) {
    throw new Error('User not found');
  }

  if (user.isDeleted) {
    throw new Error('User is no longer available');
  }
};
