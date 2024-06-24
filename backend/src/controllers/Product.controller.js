import { Product } from "../models/Products.model.js";
import { TryCatch } from "../middlewares/error_handle.middleware.js";

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
    products,
  });
});

const getSingleProductController =TryCatch(async(req,res)=>{
  const _id =req.params.id;
  if(!_id){
    return res.status(201).json({message:"Invalid product"})
  }
  const product =await Product.findOne({_id})

  if(!product){
    return res.status(201).json({message:"Product not found"})
  }

  res.status(200).json({
    success: true,
    message:"Product found succesfully",
    product
  });

})

export { GetAllProductController,getSingleProductController };
