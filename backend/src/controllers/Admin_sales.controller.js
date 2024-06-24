import { BellingForm } from "../models/belling_form.model.js";
import { TryCatch } from "../middlewares/error_handle.middleware.js";
// import { Cart } from "../models/Cart.model.js";

const getSalesProductsController = TryCatch(async (req, res) => {
  const getBills = await BellingForm.find({});

  if (!getBills) {
    return res.status(201).json({ message: "no bill found" });
  }
  let allCarts=[];
  getBills.forEach((bill) => {
    bill.carts.forEach((cart)=>{
      allCarts.push(cart)
    })
  })

  return res.status(200).json({
    success: true,
    data: allCarts,
  })
});

export { getSalesProductsController };
