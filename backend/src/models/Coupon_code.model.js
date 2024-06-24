import mongoose from "mongoose";

const couponSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
        uppercase:true
    },
    discount:{
        type:Number,
        required:true
    }
},{timestamps:true})

export const CouponCode =mongoose.model("Coupen",couponSchema)