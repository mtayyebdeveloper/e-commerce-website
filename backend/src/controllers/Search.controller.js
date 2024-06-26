import { Product } from "../models/Products.model.js";
import { TryCatch } from "../middlewares/error_handle.middleware.js";

const SearchController = TryCatch(async (req, res) => {
  let keyword = req.query.keyword;
  keyword = keyword.toString()
  const products = await Product.find({
    name: { $regex: keyword, $options: "i" },
  });
  res.status(200).json({
    success: true,
    message: "Search successful",
    products,
  });
});

export {SearchController}