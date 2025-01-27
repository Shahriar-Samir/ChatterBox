import { model, Schema } from 'mongoose';
import TConversation from './conversations.interface';

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
      type: [String],
      length: 10,
      required: true,
    },
    type: {
      type: String,
      enum: ['inbox', 'group'],
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
