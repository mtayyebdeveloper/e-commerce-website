import { Review } from "../models/Review.model.js";
import { User } from "../models/User.model.js";
import { Product } from "../models/Products.model.js";
import { TryCatch } from "../middlewares/error_handle.middleware.js";

const createReviewController = TryCatch(async (req, res) => {
  const userId = req.user._id;
  const productId = req.params.id;
  const {rating, comment } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({
      success: false,
      message: "user and product is not found",
    });
  }

  if (!rating || !comment) {
    return res.status(400).json({
      success: false,
      message: "name, rating and comment is required",
    });
  }

  const user =await User.findById(userId);
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "user is not found",
    });
  }

  const review = await Review.create({
    name:user.name,
    rating,
    comment,
    avatar: user.avatar.url,
    user: userId,
    product: productId,
  });

  if (!review) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }

  return res.status(200).json({
    success: true,
    message: "review sended successfully",
    data: review,
  });
});

const getReviewController = TryCatch(async (req, res) => {
  const productId = req.params.id;

  if (!productId) {
    return res.status(400).json({
      success: false,
      message: "product is not found",
    });
  }

  const reviews = await Review.find({ product: productId });
  if (!reviews) {
      return res.status(400).json({
          success: false,
          message: "Something went wrong",
        });
    }

  return res.status(200).json({
    success: true,
    message: "review get successfully",
    data: reviews,
  });
});

export { createReviewController, getReviewController };
