import MessageModel from './messages.model';

const createAMessageIntoDB = async (payload: TMessages) => {
  const result = await MessageModel.create(payload);
  return result;
};

const removeAMessageForAllIntoDB = async (MId: string) => {
  const result = await MessageModel.updateOne(
    { MId, isDeletedForAll: false, isDeletedForSender: false },
    { isDeletedForAll: true },
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
  createAMessageIntoDB,
  removeAMessageForAllIntoDB,
  removeAMessageForSenderIntoDB,
};
