import dotenv from "dotenv";
import mongoose from "mongoose";
export default mongoose;

export { UserModel } from "./UserModel.js";

dotenv.config({ path: new URL("../../.env", import.meta.url).pathname });

mongoose.connect(process.env.DB);