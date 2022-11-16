/**
 * @file Declare Group data type representing a group.
 */

import mongoose, {Collection} from "mongoose";

/**
 * @typedef Group Represents a group of user
 * @property {Group} id group's id
 * @property {Collection<String>} members A list of members to the group
 * @property {Date} createdOn Date of when the group was created
 * @property {Collection<String>} admin A list of members that are admins of the group
 * @property {string} groupName group's name
 * @property {string} description group's name
 */

export default interface Group {
    _id?: mongoose.Schema.Types.ObjectId,
    members: Collection<String>
    createdOn?: Date
    admin: Collection<String>
    groupName: string
    description: string
};