/**
 * @file Implements DAO managing data storage of groups. Uses mongoose GroupModel
 * to integrate with MongoDB
 */
import GroupDaoI from "../interfaces/group/GroupDaoI";
import Group from "../models/group/Group";

export default class GroupDao implements GroupDaoI {
    private static groupDao: GroupDao | null = null

    /**
     * Creates singleton DAO instance
     * @returns {GroupDao} GroupDao
     */
    public static getInstance = (): GroupDao => {
        if (GroupDao.groupDao === null) {
            GroupDao.groupDao = new GroupDao()
        }
        return GroupDao.groupDao
    }

    private constructor() {
    }

    deleteGroup(uid: string, gid: string): Promise<any> {
        return Promise.resolve(undefined);
    }

    findAllCommonGroupsAnotherUser(active_uid: string, other_uid: string): Promise<Group[]> {
        return Promise.resolve([]);
    }

    findAllGroupsForUser(uid: string): Promise<Group[]> {
        return Promise.resolve([]);
    }

    findGroupByName(group_name: string, uid: string): Promise<Group[]> {
        return Promise.resolve([]);
    }

    updateGroup(uid: string, gid: string, group: Group): Promise<any> {
        return Promise.resolve(undefined);
    }

    userCreatesGroup(uid: string, group: Group): Promise<Group> {
        return Promise.resolve(undefined);
    }


}