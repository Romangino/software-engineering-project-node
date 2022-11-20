/**
 * @file Implements DAO managing data storage of groups. Uses mongoose GroupModel
 * to integrate with MongoDB
 */
import GroupDaoI from "../interfaces/group/GroupDaoI";
import Group from "../models/group/Group";
import GroupModel from "../mongoose/groups/GroupModel"

/**
 * @class GroupDao Implements Data Access Object managing data storage
 * of Groups
 * @property {GroupDao} groupDao Private single instance of GroupDao
 */
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

    /**
     * Removes group object with given primary key from database.
     * @param {string} uid Primary key of user
     * @param {string} gid Primary key of group
     * @returns Promise To be notified when group is removed from the database
     */
    deleteGroup = async (uid: string, gid: string): Promise<any> =>
        GroupModel.deleteOne({_id: gid})

    /**
     * Finds all groups with both active user and other user
     * @param {string} active_uid Primary key of active user
     * @param {string} other_uid Primary key of other user
     * @returns Promise To be notified when group is retrieved from database
     */
    findAllCommonGroupsAnotherUser = async (active_uid: string, other_uid: string): Promise<Group[]> =>
        GroupModel.find({members: {$all: [active_uid, other_uid]}})

    /**
     * Finds all groups that a user is in
     * @param {string} uid Primary key of user
     * @returns Promise To be notified when group is retrieved from database
     */
    findAllGroupsForUser = async (uid: string): Promise<Group[]> =>
        GroupModel.find({members: uid})

    /**
     * Finds group by group name that only the user is in
     * @param {string} group_name The name of the group
     * @param {string} uid Primary key of user
     * @returns Promise To be notified when group is retrieved
     */
    findGroupByName = async (group_name: string, uid: string): Promise<Group[]> =>
        GroupModel.find({groupName: group_name, members: uid})

    /**
     * Finds group by group id
     * @param {string} gid Primary key of group
     * @returns Promise To be notified when group is retrieved
     */
    findGroupByGroupId = async (gid: string): Promise<any> =>
        GroupModel.findById(gid)

    /**
     * Updates group with new values in the database.
     * @param {string} gid Primary key of group
     * @param {Group} group Group body with new values for group
     * @returns Promise To be notified when group is updated in database
     */
    updateGroup = async (gid: string, group: Group): Promise<any> =>
        GroupModel.updateOne(
            {_id: gid},
            {$set: group})

    /**
     * Inserts group object into database
     * @param {string} uid Primary key of user creating group
     * @param {Group} group
     * @returns Promise To be notified when group is inserted into database
     */
    userCreatesGroup = async (uid: string, group: Group): Promise<Group> =>
        GroupModel.create({...group, members: [uid], admin: [uid]})

}