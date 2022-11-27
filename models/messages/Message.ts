/**
 * @file Declare Message data type representing a message from a user sent to
 * another user.
 */
import User from "../users/User";
import Group from "../group/Group";

/**
 * @typedef Message Represents message being sent from one user to another user
 * @property {string} content the contents of the message
 * @property {Group} to Group that is receiving the message
 * @property {User} from User that is sending the message
 * @property {Date} date Date of when the message was sent
 */
export default interface Message {
    content: string,
    group: Group,
    sentBy: User,
    sentOn?: Date
};