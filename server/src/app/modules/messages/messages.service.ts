import IdGenerator from '../../util/IdGenerator';
import MessageModel from './messages.model';

const getAllConversationMessages = async (CId: string) => {
  const result = await MessageModel.find({ CId }).sort({ createdAt: 1 });
  return result;
};

const createAMessageIntoDB = async (payload: TMessages) => {
  const MId = await IdGenerator('message');
  payload.MId = MId as string;
  const result = await MessageModel.create(payload);
  return result;
};

const updateAMessageIntoDB = async (MId: string, payload: TMessages) => {
  const result = await MessageModel.updateOne(
    { isDeletedForAll: false, isDeletedForSender: false, MId },
    { content: payload.content, isEdited: true },
  );
  return result;
};

const removeAMessageForAllIntoDB = async (MId: string) => {
  const result = await MessageModel.updateOne(
    { MId, isDeletedForAll: false, isDeletedForSender: false },
    { isDeletedForAll: true, isDeletedForSender: true },
  );
  return result;
};

const removeAMessageForSenderIntoDB = async (MId: string) => {
  const result = await MessageModel.updateOne(
    { MId, isDeletedForAll: false, isDeletedForSender: false },
    { isDeletedForSender: true },
  );
  return result;
};

export default {
  getAllConversationMessages,
  createAMessageIntoDB,
  removeAMessageForAllIntoDB,
  removeAMessageForSenderIntoDB,
  updateAMessageIntoDB,
};
