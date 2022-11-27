/**
 * @file Implements mongoose schema for messages.
 */
import mongoose, {Schema} from "mongoose";
import Message from "../../models/messages/Message"

const MessageSchema = new mongoose.Schema<Message>({
    content: {type: String, required: true},
    group: {type: Schema.Types.ObjectId, ref: "GroupModel"},
    sentBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    sentOn: {type: Date, default: Date.now()}
}, {collection: "messages"});
export default MessageSchema