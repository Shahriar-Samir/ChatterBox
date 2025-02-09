import { model, Schema } from 'mongoose';
import { TUser } from './users.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser>(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
    },
    participantType: {
      type: String,
      enum: ['admin', 'user'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
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

userSchema.pre('save', async function (next) {
  const hashedPass = await bcrypt.hash(
    this.password,
    config.saltRounds as number,
  );
  this.password = hashedPass;
  next();
});

const UserModel = model<TUser>('User', userSchema);

export default UserModel;
