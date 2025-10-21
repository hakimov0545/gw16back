import { Schema, model } from "mongoose";

const userSchema = new Schema({
	name: { type: String, required: true },
	phone: { type: String },
	email: { type: String, required: true },
	password: { type: String, required: true },
});

const userModel = model("User", userSchema);

export default userModel;
