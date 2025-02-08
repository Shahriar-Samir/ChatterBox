import IdGenerator from '../../util/IdGenerator';
import MessageModel from './messages.model';
import { getReceiverSocketId, io } from '../../../lib/socket';

const getAllConversationMessages = async (CId: string) => {
  const result = await MessageModel.find({ CId })
    .sort({ createdAt: 1 })
    .select({
      _id: 0,
    });
  return result;
};

const createAMessageIntoDB = async (payload: TMessages, receiverId: string) => {
  const MId = await IdGenerator('message');
  payload.MId = MId as string;
  const result = await MessageModel.create(payload);

  const receiverSocketId = getReceiverSocketId(receiverId);
  io.to(receiverSocketId).emit('newMessage', result);

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
