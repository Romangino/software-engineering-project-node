/**
 * @file Controller RESTful Web service API for messages resource
 */
import MessageControllerI from "../interfaces/messages/MessageControllerI";
import MessageDao from "../daos/MessageDao";
import {Request, Response, Express} from "express";
import Message from "../models/messages/Message";

/**
 * @class MessageController Implements RESTful Web service API for messages resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/messages to retrieve all message instances</li>
 *     <li>GET /api/messages/:uid to retrieve all messages sent to user</li>
 *     <li>GET /api/users/:uid/messages to retrieve all messages sent by user</li>
 *     <li>DELETE api/messages/:mid to delete a message from database</li>
 *     <li>POST /api/users/:uid/messages/:ouid to send a message from one user
 *     to another user</li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing message CRUD operations
 * @property {MessageController} messageController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;

    /**
     *Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return {MessageController} MessageController
     */
    public static getInstance = (app: Express): MessageController => {
        if (MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.get("/api/messages", MessageController.messageController
                .findAllMessages);

            app.get("/api/users/:uid/sent", MessageController.messageController
                .findAllMessagesSentByUser);

            app.get("/api/groups/:gid/messages", MessageController.messageController
                .findAllMessagesInGroup);

            app.delete("/api/messages/:mid", MessageController.messageController
                .userDeleteMessage);

            app.post("/api/users/:uid/groups/:gid", MessageController.messageController
                .userMessageGroup);

            app.put("/api/messages/:mid", MessageController.messageController
                .userEditMessage);
        }
        return MessageController.messageController;
    }

    private constructor() {
    }

    /**
     * Retrieves all messages from the database and returns an array of messages.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findAllMessages = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessages()
            .then(messages => res.json(messages));

    /**
     * DEPRECATED
     * Retrieves all messages sent to user from the database and returns an
     * array of messages.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findAllMessagesReceivedByUser = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesReceivedByUser(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * Retrieves all messages sent by user from the database and returns an
     * array of messages.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findAllMessagesSentByUser = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesSentByUser(req.params.uid)
            .then(messages => res.json(messages))

    /**
     * Retrieves all messages contained within a group from the database and returns an
     * array of messages.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
     findAllMessagesInGroup = (req: Request, res: Response) =>
     MessageController.messageDao.findAllMessagesInGroup(req.params.gid)
         .then(messages => res.json(messages))

    /**
     * Removes a message instance from the database
     * @param {Request} req Represents request from client, including path
     * parameter mid identifying the primary key of the message to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a message was successful or not
     */
    userDeleteMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userDeleteMessage(req.params.mid)
            .then(status => res.json(status))

    /**
     * Edits a message instance from the database 
     * @param {Request} req Represents request from client, including path
     * parameter tid identifying the primary key of the tuit to be modified
     * @param {Response} res Represents response to client, including status
     * on whether updating a tuit was successful or not
     */
     userEditMessage = (req: Request, res: Response) =>
     MessageController.messageDao.userEditMessage(req.params.mid, req.body)
         .then(status => res.json(status));

    /**
     * Creates a message instance from the database
     * @param {Request} req Represents request from client, including path
     * parameter mid identifying the primary key of the message to be removed
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the message object
     */
     userMessageGroup = (req: Request, res: Response) =>
        MessageController.messageDao.userMessageGroup(
            req.params.uid,
            req.params.gid,
            req.body
        ).then((message: Message) => res.json(message))
}