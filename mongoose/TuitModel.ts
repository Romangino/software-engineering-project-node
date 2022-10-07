import mongoose from "mongoose";
import tuitSchema from "./TuitSchema";

const TuitModel = mongoose.model("TuitModel", tuitSchema);

export default TuitModel;