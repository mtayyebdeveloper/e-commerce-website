import mongoose from "mongoose";


const bellingFormSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address1: {
      type: String,
      required: true,
    },
    address2: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
    paymentType: {
      type: String,
      required: true,
    },
    total_price: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    carts: [
      {
        name: { type: String },
        quantity: { type: Number },
        color: { type: String },
        size: { type: String },
        category: { type: String },
        price: { type: Number },
        total_price: { type: Number },
        date:{
          type:String,
          default:new Date().toLocaleDateString()
        }
      },
    ],
  },
  { timestamps: true }
);

export const BellingForm = mongoose.model("BellingForm", bellingFormSchema);
