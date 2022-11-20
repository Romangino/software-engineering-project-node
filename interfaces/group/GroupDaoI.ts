/**
 * @file Declares Controller RESTful Web service API for group resource
 */

import Group from "../../models/group/Group";

export default interface GroupDaoI {

    userCreatesGroup(uid: string, group: Group): Promise<Group>;

    findAllGroupsForUser(uid: string): Promise<Group[]>;

    updateGroup(gid: string, group:Group): Promise<any>;

    deleteGroup(gid: string): Promise<any>;

    findGroupByName(group_name: string, uid: string): Promise<Group[]>;

    findGroupByGroupId(gid: string): Promise<any>

    findAllCommonGroupsAnotherUser(active_uid: string, other_uid: string): Promise<Group[]>;
};