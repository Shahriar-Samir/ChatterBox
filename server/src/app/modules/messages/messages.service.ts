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

const createAMessageIntoDB = async (payload: any) => {
  const MId = await IdGenerator('message');
  payload.messageData.MId = MId as string;

  const result = await MessageModel.create(payload.messageData);

  let receiverSocketIds: string[];

  if (Array.isArray(payload.receivers)) {
    const receiversUid = payload.receivers.map((receiver: any) => receiver.uid);
    receiverSocketIds = receiversUid.map((id: any) => getReceiverSocketId(id));
  } else {
    // If it's a single receiver, just get the socket ID
    receiverSocketIds = [getReceiverSocketId(payload.receivers)];
  }

  // Emit the 'newMessage' event to each receiver
  receiverSocketIds.forEach((socketId) => {
    if (socketId) {
      io.to(socketId).emit('newMessage', result);
    }
  });

  return result;
};

const updateAMessageIntoDB = async (MId: string, payload: TMessages) => {
  const result = await MessageModel.updateOne(
    { isDeletedForAll: false, isDeletedForSender: false, MId },
    { content: payload.content, isEdited: true },
  );

  if (result.modifiedCount > 0) {
    const conversationSocketIds = getReceiverSocketId(payload.CId);

    if (Array.isArray(conversationSocketIds)) {
      // Emit to each socket in the array if multiple users are involved
      conversationSocketIds.forEach((socketId) => {
        if (socketId) {
          io.to(socketId).emit('updateMessage', {
            MId,
            content: payload.content,
          });
        }
      });
    } else if (conversationSocketIds) {
      // Single receiver
      io.to(conversationSocketIds).emit('updateMessage', {
        MId,
        content: payload.content,
      });
    }
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
    // Emit to all users in the conversation (CId)
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
    // Emit to the conversation where the sender is
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
