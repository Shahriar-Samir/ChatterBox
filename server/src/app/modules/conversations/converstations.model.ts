import { model, Schema } from 'mongoose';
import TConversation, { TParticipant } from './conversations.interface';

const participantSchema = new Schema<TParticipant>({
  uid: {
    type: String,
    required: true,
  },
  joinedAt: {
    type: String,
    required: true,
  },
  lastReadMessageId: {
    type: String,
    required: true,
    default: null,
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
