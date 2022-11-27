/**
 * @file Controller RESTful Web service API for Group resource
 */

import GroupDao from "../daos/GroupDao";
import Group from "../models/group/Group";
import {Express, Request, Response} from "express";
import GroupControllerI from "../interfaces/group/GroupControllerI";

/**
 * @class GroupController Implements RESTful Web service API for Group resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>DELETE /api/groups/:uid/:gid to delete a group using the deleting user's PK the group PK</li>
 *     <li>GET /api/groups/:auid/common/:ouid to retrieve all groups in common between the session's active user and
 *     some other user</li>
 *     <li>GET /api/groups/user/:uid to find all groups for a specified user</li>
 *     <li>GET /api/groups/user/:uid/:group_name to find a group by the group's name</li>
 *     <li>GET /api/groups/:gid to find a group by the group's PK</li>
 *     <li>PUT /api/groups/:gid to update a specified group using the group's PK</li>
 *     <li>POST /api/groups/:uid to create a group</li>
 * </ul>
 * @property {GroupDao} groupDao Singleton DAO implementing group CRUD operations
 * @property {GroupController} groupController Singleton controller implementing
 * RESTful Web service API
 */

export default class GroupController implements GroupControllerI {
    private static groupDao: GroupDao = GroupDao.getInstance();
    private static groupController: GroupController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return GroupController
     */
    public static getInstance = (app: Express): GroupController => {
        if (GroupController.groupController === null) {
            GroupController.groupController = new GroupController();
            app.delete("/api/groups/:uid/:gid", GroupController.groupController.deleteGroup);
            app.get("/api/groups/:auid/common/:ouid", GroupController.groupController.findAllCommonGroupsAnotherUser);
            app.get("/api/groups/user/:uid", GroupController.groupController.findAllGroupsForUser);
            app.get("/api/groups/user/:uid/:group_name", GroupController.groupController.findGroupByName);
            app.get("/api/groups/:gid", GroupController.groupController.findGroupByGroupId);
            app.put("/api/groups/:gid", GroupController.groupController.updateGroup);
            app.post("/api/groups/:uid", GroupController.groupController.userCreatesGroup);
        }
        return GroupController.groupController;
    }

    constructor() {
    }

    /**
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user deleting the group
     * and gid identifying the primary key of the group to be deleted
     * @param {Response} res Represents response to client, including status
     * on whether deleting the group was successful or not
     */
    deleteGroup = (req: Request, res: Response) =>
        GroupController.groupDao.deleteGroup(req.params.uid, req.params.gid)
            .then((status: any) => res.json(status));

    /**
     * Retrieves all groups from the database that the logged-in user has in common with
     * another specified user and returns an array of groups.
     * @param {Request} req Represents request from client, including the logged-in (active)
     * user's primary key and the other specified user's primary key
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the group objects
     */
    findAllCommonGroupsAnotherUser = (req: Request, res: Response) =>
        GroupController.groupDao.findAllCommonGroupsAnotherUser(req.params.auid, req.params.ouid)
            .then((groups: Group[]) => res.json(groups));

    /**
     * Retrieves all groups from the database that the logged-in user is a part of.
     * @param {Request} req Represents request from client, including the logged-in (active)
     * user's primary key
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the group objects
     */
    findAllGroupsForUser = (req: Request, res: Response) =>
        GroupController.groupDao.findAllGroupsForUser(req.params.uid)
            .then((groups: Group[]) => res.json(groups));

    /**
     * Retrieves a particular group that a user is a part of by the group's name.
     * @param {Request} req Represents request from client, including the
     * user's primary key and the group's name
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the group objects.
     * NOTE: The response is an array of groups as the query may return
     * more (or less) than 1 group
     */
    findGroupByName = (req: Request, res: Response) =>
        GroupController.groupDao.findGroupByName(req.params.group_name, req.params.uid)
            .then((groups: Group[]) => res.json(groups));

    /**
     * Retrieves a particular group by the group's primary key.
     * @param {Request} req Represents request from client, including the
     * group's primary key
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the group that matches the group ID
     */
    findGroupByGroupId = (req: Request, res: Response) =>
        GroupController.groupDao.findGroupByGroupId(req.params.gid)
            .then((g: any) => res.json(g));

    /**
     * Updates a specified, pre-existing group.
     * @param {Request} req Represents request from client, including body
     * containing the JSON object for the updated group and the group's primary key
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the group that was updated in the
     * database
     */
    updateGroup = (req: Request, res: Response) =>
        GroupController.groupDao.updateGroup(req.params.gid, req.body)
            .then((group: Group) => res.json(group));

    /**
     * Creates a new group instance in the database.
     * @param {Request} req Represents request from client, including body
     * containing the JSON object for the new group and the creating user's primary key
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the group that was updated in the
     * database
     */
    userCreatesGroup = (req: Request, res: Response) =>
        GroupController.groupDao.userCreatesGroup(req.params.uid, req.body)
            .then((group: Group) => res.json(group));
}