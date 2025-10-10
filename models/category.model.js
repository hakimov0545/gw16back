import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String },
});

const CategoryModel = model("Category", categorySchema);

export default CategoryModel;
