/**
 * @file Declares Controller RESTful Web service API for groups resource
 */

import {Response, Request} from "express";

export default interface GroupControllerI {
    userCreatesGroup(req: Request, res: Response): void;

    findAllGroupsForUser(req: Request, res: Response): void;

    updateGroup(req: Request, res: Response): void;

    deleteGroup(req: Request, res: Response): void;

    findGroupByName(req: Request, res: Response): void;

    findAllCommonGroupsAnotherUser(req: Request, res: Response): void;
}