import express from "express";
import {createReviewController,getReviewController} from '../controllers/Review.controller.js'
import jwtVerify from '../middlewares/jwt.middleware.js'

const ReviewRouter = express.Router();

ReviewRouter.route('/createreview/:id').post(jwtVerify,createReviewController);
ReviewRouter.route('/getreview/:id').get(getReviewController);

export { ReviewRouter }