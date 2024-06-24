import { CouponCode } from "../models/Coupon_code.model.js";
import { TryCatch } from "../middlewares/error_handle.middleware.js";

const getCouponController = TryCatch(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(201).json({ message: "code is required" });
  }

  const findcoupon = await CouponCode.findOne({ name });

  if (!findcoupon) {
    return res.status(201).json({ message: "Coupon code not found" });
  }

  return res.status(200).json({
    success: true,
    message: "Coupon found successfully.",
    data: findcoupon,
  });
});

export {getCouponController}
