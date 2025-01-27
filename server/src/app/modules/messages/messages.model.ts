import { model, Schema } from 'mongoose';

const messageSchema = new Schema<TMessages>(
  {
    MId: {
      type: String,
      required: true,
      unique: true,
    },
    conversationId: {
      type: String,
      required: true,
    },
    senderId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isDeletedForSender: {
      type: Boolean,
      default: false,
    },
    isDeletedForAll: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const MessageModel = model<TMessages>('Message', messageSchema);

export default MessageModel;
