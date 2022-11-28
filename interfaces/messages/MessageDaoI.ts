/**
 * @file Declares API for Messages related data access object methods
 */
import Message from "../../models/messages/Message";

export default interface MessageDaoI {
    findAllMessages(): Promise<Message[]>;

    userMessageGroup(uid: string, gid: string, message: Message): Promise<Message>;

    findAllMessagesSentByUser(uid: string): Promise<Message[]>;

    findAllMessagesInGroup(gid: string): Promise<Message[]>;

    userDeleteMessage(mid: string): Promise<any>;

    userEditMessage(mid: string, message: Message): Promise<any>;
}