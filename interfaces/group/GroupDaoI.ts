/**
 * @file Declares Controller RESTful Web service API for likes resource
 */

// add model here

export default interface GroupDaoI {

    userCreatesGroup(uid: string, group: Group): Promise<Group>

    findAllGroupsForUser(uid: string): Promise<Group[]>

    updateGroup(uid: string, gid: string, group:Group): Promise<any>;

    deleteGroup(uid: string, gid: string): Promise<any>;

    findGroupByName(group_name: string, uid: string): Promise<Group[]>;

    findAllCommonGroupsAnotherUser(active_uid: string, other_uid: string): Promise<Group[]>;
};