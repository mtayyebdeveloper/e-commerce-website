import {CouponCode} from '../models/Coupon_code.model.js'
import {TryCatch} from '../middlewares/error_handle.middleware.js'

const createCouponController =TryCatch(async(req,res)=>{
    const {name,discount} =req.body;

    if(!name ||!discount){
        return res.status(201).json({message:"Name and discount are required"})
    }

    const coupon =await CouponCode.create({
        name,
        discount
    })

    if(!coupon){
        return res.status(201).json({message:"some thing wrong"})
    }

    return res.status(200).json({
        success:true,
        message:"Coupon created successfully.",
        data:coupon
    })
})

const deleteCouponController =TryCatch(async(req,res)=>{
    const _id =req.params.id;

    if(!_id){
        return res.status(201).json({message:"id is required"})
    }

    const coupon =await CouponCode.findByIdAndDelete({_id})

    if(!coupon){
        return res.status(201).json({message:"some thing wrong"})
    }

    return res.status(200).json({
        success:true,
        message:"Coupon deleted successfully."
    })
})

const getAllCouponController =TryCatch(async(req,res)=>{
    const findcoupon =await CouponCode.find({})

    if(!findcoupon){
        return res.status(201).json({message:"coupon not found"})
    }

    return res.status(200).json({
        success:true,
        message:"Coupon found successfully.",
        data:findcoupon
    })
})

export {createCouponController,deleteCouponController,getAllCouponController}