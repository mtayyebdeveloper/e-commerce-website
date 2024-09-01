import { HomeController,RegisterController,LoginController,getUserController } from "../controllers/Auth.controller.js";
import {upload} from '../middlewares/files.middleware.js'
import jwtVerify from '../middlewares/jwt.middleware.js'
import express from "express";

const AuthRouter = express.Router();

AuthRouter.route("/").get(HomeController);
AuthRouter.route("/register").post(upload.single("file"),RegisterController);
AuthRouter.route("/login").post(LoginController);
AuthRouter.route("/user").get(jwtVerify,getUserController);

export { AuthRouter };
