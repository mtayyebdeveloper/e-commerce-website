import { BellingForm } from "../models/belling_form.model.js";
import { TryCatch } from "../middlewares/error_handle.middleware.js";

const getallBillingController = TryCatch(async (req, res) => {
  const billingForm = await BellingForm.find({});

  if (!billingForm) {
    return res.status(201).json({ message: "Billing form not found" });
  }

  return res.status(200).json({
    success: true,
    message: "Billing form found",
    data: billingForm,
  });
});
const deleteBillingController = TryCatch(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(201).json({ message: "Invalid id" });
  }
  const billingForm = await BellingForm.findByIdAndDelete(id);

  return res.status(200).json({
    success: true,
    message: "Bill deleted successfully",
  });
});

export { getallBillingController, deleteBillingController };
