import IdGenerator from '../../util/IdGenerator';
import MessageModel from './messages.model';
import { getSocketIds } from '../../../lib/socket';
import { io } from '../../socket';

const getAllConversationMessages = async (CId: string) => {
  const result = await MessageModel.find({ CId }).sort({ createdAt: 1 });
  return result;
};

const createAMessageIntoDB = async (payload: TMessages) => {
  const MId = await IdGenerator('message');
  payload.MId = MId as string;
  const result = await MessageModel.create(payload);

  // Fetch all active socket IDs related to the conversation
  io.to(payload.CId).emit('newMessage', result);

  return result;
};

const updateAMessageIntoDB = async (MId: string, payload: TMessages) => {
  const result = await MessageModel.updateOne(
    { isDeletedForAll: false, isDeletedForSender: false, MId },
    { content: payload.content, isEdited: true },
  );

  if (result.modifiedCount > 0) {
    io.to(payload.CId).emit('updateMessage', { MId, content: payload.content });
  }

  return result;
};

const removeAMessageForAllIntoDB = async (MId: string) => {
  const message = await MessageModel.findOne({
    MId,
    isDeletedForAll: false,
    isDeletedForSender: false,
  });
  if (!message) return null;

  const result = await MessageModel.updateOne(
    { MId },
    { isDeletedForAll: true, isDeletedForSender: true },
  );

  if (result.modifiedCount > 0) {
    io.to(message.CId).emit('deleteMessageForAll', { MId });
  }

  return result;
};

const removeAMessageForSenderIntoDB = async (MId: string) => {
  const message = await MessageModel.findOne({
    MId,
    isDeletedForAll: false,
    isDeletedForSender: false,
  });
  if (!message) return null;

  const result = await MessageModel.updateOne(
    { MId },
    { isDeletedForSender: true },
  );

  if (result.modifiedCount > 0) {
    io.to(message.CId).emit('deleteMessageForSender', { MId });
  }

  return result;
};

export default {
  getAllConversationMessages,
  createAMessageIntoDB,
  removeAMessageForAllIntoDB,
  removeAMessageForSenderIntoDB,
  updateAMessageIntoDB,
};
