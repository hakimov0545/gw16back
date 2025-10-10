import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";

import ProductModel from "./models/product.model.js";
import CategoryModel from "./models/category.model.js";

const app = express();

app.use(express.json());

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

app.get("/products", async (req, res) => {
  const products = await ProductModel.find();
  res.json(products);
});

app.get("/categories", async (req, res) => {
  const categories = await CategoryModel.find();
  res.json(categories);
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

async function starter() {
  try {
    await mongoose.connect(DB_URL).then(() => {
      console.log("DB connected");
    });
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`Error connecting with DB: ${error}`);
  }
}

starter();
