import {getCouponController} from '../controllers/Coupon.controller.js'
import jwtVerify from '../middlewares/jwt.middleware.js'
import express from 'express'

const CouponRouter =express.Router()

CouponRouter.route("/getcoupon").post(jwtVerify,getCouponController)

export {CouponRouter}