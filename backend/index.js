import express from "express";
import "dotenv/config";
import databaseconnection from "./src/database/db.connection.js";
import cors from "cors";
import { ErrorHandle } from "./src/middlewares/error_handle.middleware.js";
import { AuthRouter } from "./src/routes/Auth.route.js";
import { AdminRouter } from "./src/routes/Admin.route.js";
import ContactRouter from './src/routes/Contact.route.js'
import { CartRouter } from "./src/routes/Cart.route.js";
import { ProductRouter } from "./src/routes/Product.route.js";
import {SearchRouter} from './src/routes/Search.route.js'
import {ReviewRouter} from './src/routes/Review.route.js'
import {CouponRouter} from './src/routes/Coupon.route.js'
import {BillingFormRouter} from './src/routes/Billing_form.route.js'

// express server...........
const app = express();

// database connection..........
databaseconnection();

// middlewares..............
app.use(express.json());

// cors......................
const options = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE", "HEAD", "PATCH"],
};
app.use(cors(options));

// routes...................
app.use("/api/auth", AuthRouter);
app.use("/api/admin", AdminRouter);
app.use("/api/cart", CartRouter);
app.use("/api/product", ProductRouter);
app.use("/api/contact",ContactRouter);
app.use("/api/review",ReviewRouter);
app.use("/api/billing",BillingFormRouter);
app.use("/api/coupon",CouponRouter);
app.use("/api/search",SearchRouter);

// error handle middleware...............
app.use(ErrorHandle);

// server listening...........
app.listen(process.env.PORT, () =>
  console.log(`server is running on port ${process.env.PORT}`)
);
