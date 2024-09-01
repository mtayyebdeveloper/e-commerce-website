import {
  CreateProductController,
  DeleteProductController,
  GetAllProductController,
  UpdateProductController,
} from "../controllers/Admin_product.controller.js";
import {
  DeleteContactController,
  GetAllContactsController,
} from "../controllers/Admin_contact.controller.js";
import { getSalesProductsController } from "../controllers/Admin_sales.controller.js";
import {createCouponController,deleteCouponController,getAllCouponController} from '../controllers/Admin_coupon.controller.js'
import {
  deleteBillingController,
  getallBillingController,
} from "../controllers/Admin_billing.controller.js";
import {
  DeleteUserController,
  GetAllUserController,
  updateUserController,
} from "../controllers/Admin_user.controller.js";
import adminMiddleware from "../middlewares/admin.middleware.js";
import { upload } from "../middlewares/files.middleware.js";
import jwtVerify from "../middlewares/jwt.middleware.js";
import express from "express";

const AdminRouter = express.Router();

AdminRouter.route("/allproducts").get(
  jwtVerify,
  adminMiddleware,
  GetAllProductController
);
AdminRouter.route("/createproduct").post(
  jwtVerify,
  adminMiddleware,
  upload.array("file", 5),
  CreateProductController
);
AdminRouter.route("/deleteproduct/:id").delete(
  jwtVerify,
  adminMiddleware,
  DeleteProductController
);
AdminRouter.route("/updateproduct/:id").patch(
  jwtVerify,
  adminMiddleware,
  upload.array("file", 5),
  UpdateProductController
);

AdminRouter.route("/salesproducts").get(
  jwtVerify,
  adminMiddleware,
  getSalesProductsController
);

AdminRouter.route("/allusers").get(
  jwtVerify,
  adminMiddleware,
  GetAllUserController
);
AdminRouter.route("/deleteuser/:id").delete(
  jwtVerify,
  adminMiddleware,
  DeleteUserController
);
AdminRouter.route("/updateuser/:id").patch(
  jwtVerify,
  adminMiddleware,
  upload.single("file"),
  updateUserController
);

AdminRouter.route("/allcontacts").get(
  jwtVerify,
  adminMiddleware,
  GetAllContactsController
);
AdminRouter.route("/deletecontact/:id").delete(
  jwtVerify,
  adminMiddleware,
  DeleteContactController
);

AdminRouter.route("/allbill").get(
  jwtVerify,
  adminMiddleware,
  getallBillingController
);
AdminRouter.route("/deletebill/:id").delete(
  jwtVerify,
  adminMiddleware,
  deleteBillingController
);

AdminRouter.route("/createcoupon").post(
  jwtVerify,
  adminMiddleware,
  createCouponController
);

AdminRouter.route("/allcoupon").get(
  jwtVerify,
  adminMiddleware,
  getAllCouponController
);

AdminRouter.route("/deletecoupon/:id").delete(
  jwtVerify,
  adminMiddleware,
  deleteCouponController
);


export { AdminRouter };
