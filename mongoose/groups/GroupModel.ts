/**
 * @file Implements mongoose model to CRUD
 * documents in the groups collection
 */
 import mongoose from "mongoose";
 import GroupSchema from "./GroupSchema";
 
 const GroupModel = mongoose.model("GroupModel", GroupSchema);
 export default GroupModel;