import { Product } from "../models/Products.model.js";
import { TryCatch } from "../middlewares/error_handle.middleware.js";
import { cloudinaryupload } from "../middlewares/files.middleware.js";

const CreateProductController = TryCatch(async (req, res) => {
  const file = req.files;
  const { name,shortDescription, longDescription,discount_price,color,size, price,category } = req.body;

  if (!file) {
    return res.status(400).json({
      message: "product image is required",
    });
  }

  if (!name || !longDescription||!size ||!discount_price|| !shortDescription || !color || !price || !category) {
    return res.status(400).json({
      message: "all fields are required",
    });
  }
  let allfiles =file.map((file)=>(cloudinaryupload(file.path)));

  const img = await Promise.all(allfiles);
  

  const newProduct = await Product.create({
    name,
    shortDescription,
    longDescription,
    discount_price,
    color,
    price,
    size,
    category,
    image: img.map((file)=>{
      return file.url
    }),
  });
  res.status(201).json({
    success: true,
    message: "product created successfully",
    data: newProduct,
  });
});

const DeleteProductController = TryCatch(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "product id is required",
    });
  }
  const product = await Product.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: "product deleted successfully",
  });
});

const UpdateProductController = TryCatch(async (req, res) => {
  const { id } = req.params;
  const file = req.files;
  const { name, shortDescription,discount_price, longDescription,color,size, price,category } = req.body;
  if (!id) {
    return res.status(400).json({
      message: "product id is required",
    });
  }

  if (!file) {
    return res.status(400).json({
      message: "product image is required",
    });
  }

  if (!name || !shortDescription||!discount_price || !longDescription || !size || !price || !category || !color) {
    return res.status(400).json({
      message: "all fields are required",
    });
  }

  const files =file.map((file) => cloudinaryupload(file.path));
  const img = await Promise.all(files);

  const product = await Product.findByIdAndUpdate(id, {
    name,
    shortDescription,
    longDescription,
    color,
    discount_price,
    price,
    size,
    category,
    image: img.map((file) => file.url),
  });

  res.status(200).json({
    success: true,
    message: "product updated successfully",
    data: product,
  });
});

const GetAllProductController = TryCatch(async (req, res) => {
  const products = await Product.find({});
  if (!products) {
    return res.status(400).json({
      success: false,
      message: "no products found",
    });
  }
  res.status(200).json({
    success: true,
    data: products,
  });
});

export {
  CreateProductController,
  DeleteProductController,
  UpdateProductController,
  GetAllProductController,
};
