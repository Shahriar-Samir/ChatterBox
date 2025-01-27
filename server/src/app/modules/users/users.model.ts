import { model, Schema } from 'mongoose';
import { TUser } from './users.interface';

const userSchema = new Schema<TUser>(
  {
    uid: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const UserModel = model<TUser>('User', userSchema);

export default UserModel;
