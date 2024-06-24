import { Cart } from "../models/Cart.model.js";
import { Product } from "../models/Products.model.js";
import { TryCatch } from "../middlewares/error_handle.middleware.js";

const GetAllCartController = TryCatch(async (req, res) => {
  const id = req.user._id;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "user is not found",
    });
  }

  const carts = await Cart.find({ user: id });

  if (!carts) {
    return res.status(201).json({
      message: "no carts found",
    });
  }

  res.status(200).json({
    success: true,
    message: "carts found",
    data: carts
  });
});

const createCartController = TryCatch(async (req, res) => {
  const productId = req.params.id;
  const userId = req.user._id;
  const { quantity, color, size } = req.body;

  if (!productId || !userId) {
    return res.status(400).json({
      success: false,
      message: "user and product is not found",
    });
  }

  if (!quantity || !color || !size) {
    return res.status(400).json({
      success: false,
      message: "quantity, color and size is required",
    });
  }

  const CartExist = await Cart.findOne({ product: productId });
  const userExist = await Cart.findOne({ user: userId });

  if (CartExist && userExist) {
    return res.status(201).json({ message: "product already in cart" });
  }

  const findProduct = await Product.findOne({ _id: productId });

  if (!findProduct) {
    return res.status(201).json({ message: "Products not found" });
  }

  const newcart = await Cart.create({
    name: findProduct.name,
    image: findProduct.image[0],
    price: findProduct.price,
    product: productId,
    category: findProduct.category,
    quantity,
    color,
    size,
    total: findProduct.price * quantity,
    user: userId,
  });

  return res.status(200).json({
    success: true,
    message: "cart created successfully",
    data: newcart,
  });
});

const DeleteCartController = TryCatch(async (req, res) => {
  const _id = req.params.id;

  const cart = await Cart.findByIdAndDelete({ _id });

  if (!cart) {
    return res.status(201).json({ message: "Something went wrong" });
  }

  res.status(200).json({
    success: true,
    message: "Cart deleted successfully",
  });
});

const UpdateCartController = TryCatch(async (req, res) => {
  const _id = req.params.id;
  const { quantity } = req.body;

  const findcart = await Cart.findOne({ _id });

  if (!findcart) {
    return res.status(201).json({ message: "Something went wrong" });
  }

  if (!quantity) {
    return res.status(201).json({ message: "Quantity is required" });
  }

  const productId = findcart.product;
  const findProduct = await Product.findOne({ _id: productId });

  const productPrice = findProduct.price;
  const totalPrice = productPrice * quantity;

  const cart = await Cart.findByIdAndUpdate(
    { _id },
    { quantity, total: totalPrice }
  );

  if (!cart) {
    return res.status(201).json({ message: "Something went wrong" });
  }

  return res.status(200).json({
    success: true,
    message: "Cart updated successfully",
  });
});

export {
  createCartController,
  GetAllCartController,
  DeleteCartController,
  UpdateCartController,
};
