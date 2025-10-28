import jwt from "jsonwebtoken";
import tokenModel from "../models/token.model.js";

class TokenService {
	generateToken(payload) {
		const accessToken = jwt.sign(
			payload,
			process.env.JWT_ACCESS_KEY,
			{
				expiresIn: "30m",
			}
		);
		return accessToken;
	}

	async saveToken(userId, accessToken) {
		const exist = await tokenModel.findOne({ userId });
		if (exist) {
			exist.accessToken = accessToken;
			return exist.save();
		}

		const token = await tokenModel.create({
			user: userId,
			accessToken,
		});
		return token;
	}
}

export default new TokenService();
