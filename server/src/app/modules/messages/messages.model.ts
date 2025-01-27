import { model, Schema } from 'mongoose';

const messageSchema = new Schema<TMessages>(
  {
    MId: {
      type: String,
      required: true,
      unique: true,
    },
    CId: {
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
      required: true,
      default: false,
    },
    isDeletedForAll: {
      type: Boolean,
      required: true,
      default: false,
    },
    isEdited: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const MessageModel = model<TMessages>('Message', messageSchema);

export default MessageModel;
