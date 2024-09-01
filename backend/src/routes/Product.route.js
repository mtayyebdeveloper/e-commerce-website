import { GetAllProductController,getSingleProductController,updateSingleProductController } from "../controllers/Product.controller.js";
import express from "express";

const ProductRouter = express.Router();

ProductRouter.route("/allproducts").get(GetAllProductController);
ProductRouter.route("/product/:id").get(getSingleProductController);
ProductRouter.route("/updateproduct/:id").patch(updateSingleProductController);

export { ProductRouter };
