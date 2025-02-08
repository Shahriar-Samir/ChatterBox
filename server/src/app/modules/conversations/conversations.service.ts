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
    throw new Error('Conversation already exist ');
  }
  payload.CId = CId as string;
  if (payload.participants.length <= 1) {
    throw new Error('number of participants can not be one or less than one');
  }

  const participantUids = payload.participants.map((p) => p.uid);

  const commonExist = await ConversationModel.findOne({
    participants: {
      $all: participantUids.map((uid) => ({ $elemMatch: { uid } })),
    },
    type: payload.type,
    isDeleted: false,
  }).select({
    name: 0,
    __v: 0,
    createdAt: 0,
    updatedAt: 0,
    participants: 0,
    isDeleted: 0,
  });

  if (commonExist) {
    const result = commonExist;
    return result;
  }

  if (payload.type === 'inbox' && payload.participants.length > 2) {
    throw new Error('maximum number of participants can not be more than two');
  }
  if (payload.type === 'group' && payload.participants.length > 10) {
    throw new Error('maximum number of participants can not be more than ten');
  }
  const result = await ConversationModel.create(payload);
  return result;
};

const updateLastMessageIdOfConversation = async (
  CId: string,
  MId: String,
  receiverId: string,
) => {
  const result = await ConversationModel.findOneAndUpdate(
    { CId },
    { lastMessageId: MId },
  );
  const receiverSocketId = getReceiverSocketId(receiverId);
  io.to(receiverSocketId).emit('conversationUpdate', result);
  return result;
};

const removeAConversationFromDB = async (CId: string) => {
  const result = await ConversationModel.updateOne(
    { CId, isDeleted: false },
    { isDeleted: true },
  );
  return result;
};

export default {
  getSingleConversationsFromDB,
  getAllConversationsFromDB,
  createAConversationIntoDB,
  updateLastMessageIdOfConversation,
  removeAConversationFromDB,
};
