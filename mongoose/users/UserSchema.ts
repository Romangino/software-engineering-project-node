import mongoose from "mongoose";
import User from "../../models/users/User";
import AccountType from "../../models/users/AccountType";
import maritalStatus from "../../models/users/MaritalStatus";

const UserSchema = new mongoose.Schema<User>({
    username: {type: String, required: true, default: `testusername${Date.now()}`},
    password: {type: String, required: true, default: `testpassword${Date.now()}`},
    firstName: String,
    lastName: String,
    email: {type: String, required: false, default: ''},
    profilePhoto: String,
    headerImage: String,
    biography: String,
    dateOfBirth: Date,
    accountType: {
        type: String, enum: ["PERSONAL", "ACADEMIC", "PROFESSIONAL"],
        default: AccountType.Personal
    },
    maritalStatus: {
        type: String, enum: ["MARRIED", "SINGLE", "WIDOWED"],
        default: maritalStatus.Single
    },
    location: {
        latitude: Number,
        longitude: Number
    },
}, {collection: "users"});

export default UserSchema;