export type TParticipant = {
  uid: string;
  joinedAt: string;
  lastReadMessageId: string;
};

type TConversation = {
  CId: string;
  name: string;
  participants: TConversation[];
  type: 'inbox' | 'group';
  createdAt: String;
  updatedAt: String;
  isDeleted: false;
};

export default TConversation;
