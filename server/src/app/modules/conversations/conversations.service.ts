import { getReceiverSocketId, io } from '../../../lib/socket';
import IdGenerator from '../../util/IdGenerator';
import TConversation, { TParticipant } from './conversations.interface';
import ConversationModel from './converstations.model';

const getAllConversationsFromDB = async (uid: string) => {
  const result = await ConversationModel.find({
    participants: { $elemMatch: { uid } },
    isDeleted: false,
  }).sort({ updatedAt: -1 });

  return result;
};

const getSingleConversationsFromDB = async (CId: string) => {
  const result = await ConversationModel.findOne({
    CId,
    isDeleted: false,
  }).select({
    isDeleted: 0,
    createdAt: 0,
    updatedAt: 0,
    __v: 0,
    _id: 0,
  });

  return result;
};

const createAConversationIntoDB = async (payload: TConversation) => {
  const CId = await IdGenerator('conversation');
  const isConversationExist = await ConversationModel.findOne({
    CId,
    isDeleted: false,
  });

  if (isConversationExist) {
    throw new Error('Conversation already exists');
  }

  payload.CId = CId as string;

  if (payload.participants.length <= 1) {
    throw new Error('Number of participants cannot be one or less');
  }

  // const participantUids = payload.participants.map((p) => p.uid);

  // const commonExist = await ConversationModel.findOne({
  //   participants: { $all: participantUids }, // Match all participants' uids
  //   $expr: { $eq: [{ $size: '$participants' }, 2] }, // Ensure exactly 2 participants
  //   type: payload.type,
  //   isDeleted: false,
  // }).select({
  //   name: 0,
  //   __v: 0,
  //   createdAt: 0,
  //   updatedAt: 0,
  //   participants: 0,
  //   isDeleted: 0,
  // });

  // console.log(payload);

  // if (commonExist) {
  //   return commonExist; // Return existing conversation
  // }

  // Validation for max participants based on conversation type
  if (payload.type === 'inbox' && payload.participants.length > 2) {
    throw new Error('Maximum number of participants cannot be more than two');
  }

  if (payload.type === 'group' && payload.participants.length > 10) {
    throw new Error('Maximum number of participants cannot be more than ten');
  }

  // Create the conversation
  const result = await ConversationModel.create(payload);
  // Fetch socket IDs for the participants
  const receiverSocketIds = getReceiverSocketId([
    ...payload.participants.map((participant) => participant.uid),
  ]);

  // Emit updates to the relevant users
  if (Array.isArray(receiverSocketIds)) {
    // Emit to each socket if there are multiple receivers
    receiverSocketIds.forEach((socketId) => {
      if (socketId) {
        io.to(socketId).emit('conversationUpdate', result);
      }
    });
  } else if (receiverSocketIds) {
    // Emit to a single receiver
    io.to(receiverSocketIds).emit('conversationUpdate', result);
  }

  return result; // Return the created conversation
};

const updateGroupConversation = async (CId: string, groupName: string) => {
  const result = await ConversationModel.updateOne(
    { CId },
    {
      name: groupName,
    },
  );
  return result;
};

const addParticipantInGroupConversation = async (
  CId: string,
  payload: TParticipant,
) => {
  const result = await ConversationModel.updateOne(
    { CId, type: 'group', isDeleted: false },
    {
      $addToSet: { participants: payload },
    },
  );

  return result;
};

const updateLastMessageIdOfConversation = async (
  CId: string,
  MId: string,
  receiverId: string | string[], // receiverId can now be a single string or an array of strings
) => {
  // Update the conversation's last message ID
  const result = await ConversationModel.findOneAndUpdate(
    { CId },
    { lastMessageId: MId },
    { new: true }, // Ensures the updated document is returned
  );
  console.log(receiverId);

  // Get socket ID(s) for the receiver(s)
  const receiverSocketIds = getReceiverSocketId(receiverId);

  if (Array.isArray(receiverSocketIds)) {
    // If it's an array (multiple receivers), emit to each socket
    receiverSocketIds.forEach((socketId) => {
      if (socketId) {
        io.to(socketId).emit('conversationUpdate', result);
      }
    });
  } else if (receiverSocketIds) {
    // If it's a single receiver, emit to that socket ID
    io.to(receiverSocketIds).emit('conversationUpdate', result);
  }

  return result;
};

const removeAConversationFromDB = async (CId: string) => {
  const result = await ConversationModel.updateOne(
    { CId, isDeleted: false },
    { isDeleted: true },
  );
  return result;
};

const leaveGroupConversation = async (CId: string, uid: string) => {
  const result = await ConversationModel.updateOne(
    { CId, isDeleted: false },
    {
      $pull: { participants: { uid } }, // Removes the participant object with the matching uid
    },
  );

  return result;
};

const removeParticipantFromGroupConversation = async (
  CId: string,
  uid: string,
) => {
  const result = await ConversationModel.updateOne(
    { CId, isDeleted: false },
    {
      $pull: { participants: { uid } }, // Removes the participant with the specified uid
    },
  );

  return result;
};

export default {
  getSingleConversationsFromDB,
  getAllConversationsFromDB,
  createAConversationIntoDB,
  updateLastMessageIdOfConversation,
  removeAConversationFromDB,
  updateGroupConversation,
  addParticipantInGroupConversation,
  removeParticipantFromGroupConversation,
  leaveGroupConversation,
};
