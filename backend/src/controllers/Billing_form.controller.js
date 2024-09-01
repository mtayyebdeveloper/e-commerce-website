import { BellingForm } from "../models/belling_form.model.js";
import { TryCatch } from "../middlewares/error_handle.middleware.js";

const createBillingFormController = TryCatch(async (req, res) => {
  const {
    fName,
    lName,
    email,
    phone,
    address1,
    address2,
    city,
    country,
    state,
    zip,
    paymentType,
    total_price,
    carts,
  } = req.body;
  const user = req.user._id;

  if (!user) {
    return res.status(201).json({ message: "user not found" });
  }

  if (
    !fName ||
    !lName ||
    !email ||
    !phone ||
    !address1 ||
    !city ||
    !country ||
    !state ||
    !zip ||
    !paymentType ||
    !total_price ||
    !carts
  ) {
    return res.status(201).json({ message: "Please fill the all feilds" });
  }

  const billingForm = await BellingForm.create({
    fName,
    lName,
    email,
    phone,
    address1,
    address2,
    city,
    country,
    state,
    zip,
    paymentType,
    total_price,
    user,
    carts: carts.map((cart) => {
      return {
        name: cart.name,
        quantity: cart.quantity,
        color: cart.color,
        size: cart.size,
        category: cart.category,
        price: cart.price,
        total_price: cart.total_price,
      };
    }),
  });

  if (!billingForm) {
    return res
      .status(201)
      .json({ message: "Server error cannot sended your billing form" });
  }

  return res.status(200).json({
    success: true,
    message: "Billing form sended successfully please wait...",
    // data:billingForm
  });
});

export { createBillingFormController };
