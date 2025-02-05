import { model, Schema } from 'mongoose';
import TConversation, { TParticipant } from './conversations.interface';

const participantSchema = new Schema<TParticipant>({
  uid: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  joinedAt: {
    type: String,
    default: new Date().toISOString(),
  },
  lastReadMessageId: {
    type: String,
    default: null,
  },
  conStatus: {
    type: String,
    required: true,
    enum: ['accepted', 'pending', 'rejected'],
    default: 'pending',
  },
});

const conversationSchema = new Schema<TConversation>(
  {
    CId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    participants: {
      type: [participantSchema],
      length: 10,
      required: true,
    },
    type: {
      type: String,
      enum: ['inbox', 'group'],
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const ConversationModel = model<TConversation>(
  'Conversation',
  conversationSchema,
);

export default ConversationModel;
