import MessageModel from './messages.model';

const createAMessageIntoDB = async (payload: TMessages) => {
  const result = await MessageModel.create(payload);
  return result;
};

export default {
  createAMessageIntoDB,
};
