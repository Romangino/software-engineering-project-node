/**
 * @file Implements mongoose schema for groups.
 */
 import mongoose, {Schema} from "mongoose";
 import Group from "../../models/group/Group"
 
 const GroupSchema = new mongoose.Schema<Group>({
     members: {type:[]},
     createdOn: {type: Date, default: Date.now()},
     admin: {type:[]},
     groupName: {type: String},
     description: {type: String}
 }, {collection: "groups"});
 export default GroupSchema