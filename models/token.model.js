import { Schema, model } from "mongoose";

const tokenSchema = new Schema({
	user: { type: Schema.ObjectId, ref: "User" },
	accessToken: { type: String, required: true },
});

const tokenModel = model("Token", tokenSchema);

export default tokenModel;
