import mongoose from "mongoose";


const chatSchema = new mongoose.Schema({
  type: { type: String, enum: ['private', 'group'], required: true },
  name: String,
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  lastMessage: {
    text: String,
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    sentAt: Date
  }
}, { timestamps: true });

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;