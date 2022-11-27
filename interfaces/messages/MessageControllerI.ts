/**
 * @file Declares Controller RESTful Web service API for messages resource
 */
import {Request, Response} from "express";

export default interface MessageControllerI {
    findAllMessages(req: Request, res: Response): void;

    userMessageGroup(req: Request, res: Response): void;

    findAllMessagesSentByUser(req: Request, res: Response): void;

    findAllMessagesInGroup(req: Request, res: Response): void;

    findAllMessagesReceivedByUser(req: Request, res: Response): void;

    userDeleteMessage(req: Request, res: Response): void;

    userEditMessage(req: Request, res: Response): void;
}