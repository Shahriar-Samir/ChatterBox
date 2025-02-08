export type TParticipant = {
  uid: string;
  firstName: string;
  lastName: string;
  joinedAt: string;
  lastReadMessageId: string;
  conStatus: 'accepted' | 'pending' | 'blocked';
};

type TConversation = {
  CId: string;
  name: string;
  participants: TConversation[];
  type: 'inbox' | 'group';
  createdAt: String;
  updatedAt: String;
  isDeleted: false;
  lastMessageId: string,
};

export default TConversation;
