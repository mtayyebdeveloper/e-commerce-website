import { DeleteCartController,GetAllCartController,UpdateCartController,createCartController} from "../controllers/Cart.controller.js";
import jwtVerify from '../middlewares/jwt.middleware.js'
import express from "express";

const CartRouter = express.Router();

CartRouter.route("/allcarts").get(jwtVerify,GetAllCartController);
CartRouter.route("/createcart/:id").post(jwtVerify,createCartController);
CartRouter.route("/deletecart/:id").delete(jwtVerify,DeleteCartController);
CartRouter.route("/updatecart/:id").patch(jwtVerify,UpdateCartController);

export { CartRouter };
