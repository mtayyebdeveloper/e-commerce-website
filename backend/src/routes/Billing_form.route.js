import express from "express";
import { createBillingFormController } from "../controllers/Billing_form.controller.js";
import jwtVerify from '../middlewares/jwt.middleware.js'
const BillingFormRouter = express.Router();

BillingFormRouter.route("/createbill").post(jwtVerify,createBillingFormController);

export { BillingFormRouter }