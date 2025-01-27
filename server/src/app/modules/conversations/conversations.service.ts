import TConversation from './conversations.interface';
import ConversationModel from './converstations.model';

const createAConversationIntoDB = async (payload: TConversation) => {
  const isConversationExist = await ConversationModel.findOne({
    CId: payload.CId,
    isDeleted: false,
  });
  if (isConversationExist) {
    throw new Error('Conversation already exist ');
  }
  const result = await ConversationModel.create(payload);
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
  createAConversationIntoDB,
  removeAConversationFromDB,
};
