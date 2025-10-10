import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  rating: { type: Number, default: 0 },
  category: { type: Schema.Types.ObjectId, required: true, ref: "Category" },
});

const ProductModel = model("Product", productSchema);

export default ProductModel;
