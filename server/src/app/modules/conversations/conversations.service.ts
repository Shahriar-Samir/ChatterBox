import IdGenerator from '../../util/IdGenerator';
import TConversation from './conversations.interface';
import ConversationModel from './converstations.model';

const getAllConversationsFromDB = async (uid: string) => {
  const result = await ConversationModel.find({
    participants: { $elemMatch: { uid } },
    isDeleted: false,
  }).sort({ updatedAt: -1 });

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
  if (payload.type === 'inbox' && payload.participants.length > 2) {
    throw new Error('maximum number of participants can not be more than two');
  }
  if (payload.type === 'group' && payload.participants.length > 10) {
    throw new Error('maximum number of participants can not be more than ten');
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
  getAllConversationsFromDB,
  createAConversationIntoDB,
  removeAConversationFromDB,
};
