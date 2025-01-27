import ConversationModel from '../modules/conversations/converstations.model';
import MessageModel from '../modules/messages/messages.model';
import UserModel from '../modules/users/users.model';

const IdGenerator = async (type: string) => {
  if (type === 'user') {
    const users = await UserModel.find();
    if (users.length > 0) {
      const lastUserId = users[users.length - 1].uid;
      const serialNumber = parseInt(lastUserId.split('UID')[1]) + 1;
      return 'UID' + serialNumber;
    }
    return 'UID0';
  }
  if (type === 'conversation') {
    const conversations = await ConversationModel.find();
    if (conversations.length > 0) {
      const lastUserId = conversations[conversations.length - 1].CId;
      const serialNumber = parseInt(lastUserId.split('CID')[1]) + 1;
      return 'CID' + serialNumber;
    }
    return 'CID0';
  }

  if (type === 'message') {
    const messages = await MessageModel.find();
    if (messages.length > 0) {
      const lastUserId = messages[messages.length - 1].MId;
      const serialNumber = parseInt(lastUserId.split('MID')[1]) + 1;
      return 'MID' + serialNumber;
    }
    return 'MID0';
  }
};

export default IdGenerator;
