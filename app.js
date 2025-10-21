import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import ProductModel from "./models/product.model.js";
import CategoryModel from "./models/category.model.js";
import userModel from "./models/user.model.js";

const app = express();

app.use(express.json());

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const CLIENT_URL = process.env.CLIENT_URL;

app.use(
	cors({
		credentials: true,
		origin: CLIENT_URL,
	})
);

app.get("/products", async (req, res) => {
	const products = await ProductModel.find();
	res.json(products);
});

app.post("/products", async (req, res) => {
	try {
		const data = req.body;
		const newProduct = await ProductModel.create(data);
		res.json(newProduct);
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error.message });
	}
});

app.patch("/products/:id", async (req, res) => {
	try {
		const data = req.body;
		const updated = await ProductModel.findByIdAndUpdate(
			req.params.id,
			data
		);
		res.json(updated);
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error.message });
	}
});

app.delete("/products/:id", async (req, res) => {
	try {
		await ProductModel.findByIdAndDelete(req.params.id);
		res.json({ message: "Product deleted successfully" });
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error.message });
	}
});

app.get("/categories", async (req, res) => {
	const categories = await CategoryModel.find();
	res.json(categories);
});

app.post("/categories", async (req, res) => {
	try {
		const data = req.body;
		const newCategory = await CategoryModel.create(data);
		res.json(newCategory);
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error.message });
	}
});

app.post("/auth/register", async (req, res) => {
	try {
		const data = req.body;
		const email = data.email;
		const existingUser = await userModel.findOne({ email });
		if (existingUser) {
			res.json({
				message: "User with this email already exists",
			});
			throw new Error("User with this email already exists");
		}
		const newUser = await userModel.create(data);
		const user = {
			id: newUser._id,
			name: newUser.name,
			email: newUser.email,
		};
		res.json(user);
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error.message });
	}
});

async function starter() {
	try {
		await mongoose.connect(DB_URL).then(() => {
			console.log("DB connected");
		});
		app.listen(PORT, () => {
			console.log(
				`Server is running on port http://localhost:${PORT}`
			);
		});
	} catch (error) {
		console.log(`Error connecting with DB: ${error}`);
	}
}

starter();
