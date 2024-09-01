import mongoose from "mongoose";

const productschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    longDescription: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount_price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    size: [
      {
        type: String,
        required: true,
      }
    ],
    color: [
      {
        type: String,
        required: true,
      },
    ],
    image: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productschema);
