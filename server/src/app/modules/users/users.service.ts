import config from '../../config';
import IdGenerator from '../../util/IdGenerator';
import ConversationModel from '../conversations/converstations.model';
import { TUser } from './users.interface';
import UserModel from './users.model';
import bcrypt from 'bcrypt';

const getSingleUserFromDB = async (uid: string) => {
  const result = await UserModel.findOne({ uid, isDeleted: false });
  return result;
};

const getConversationUsersFromDB = async (uid: string) => {
  const result = await ConversationModel.find({
    'participants.uid': uid, // Ensure current user is part of the conversation
    isDeleted: false,
  })
    .sort({ updatedAt: -1 })
    .select({
      participants: 1, // Select only participants
    });

  // Extract users other than the current user
  const users = result
    .map((conversation) =>
      conversation.participants.filter(
        (participant) => participant.uid !== uid, // Exclude the current user
      ),
    )
    .flat(); // Flatten the array of participants

  // Use a Map to eliminate duplicates based on uid
  const uniqueUsers = Array.from(
    new Map(users.map((user) => [user.uid, user])).values(),
  );
  console.log(uniqueUsers);
  return uniqueUsers;
};

// const getConversationUsersFromDB = async (uid: string) => {
//   console.log();
//   const result = await ConversationModel.find({
//     participants: { $elemMatch: { uid: { $ne: uid } } },
//     isDeleted: false,
//   })
//     .sort({ updatedAt: -1 })
//     .select('participants'); // Optionally, you can select only the participants field

//   // Flatten the participants and remove duplicates by uid
//   const users = result
//     .map((conversation) =>
//       conversation.participants.filter(
//         (participant) => participant.uid !== uid,
//       ),
//     )
//     .flat(); // Flatten the array of participants

//   // Use a Set to eliminate duplicates based on uid
//   const uniqueUsers = Array.from(
//     new Map(users.map((user) => [user.uid, user])).values(),
//   );
//   return uniqueUsers;
// };

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
  getConversationUsersFromDB,
};
