import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

// muter handling..................
const storage = multer.diskStorage({});
const upload = multer({ storage: storage });

// cloudinary handling...............................
cloudinary.config({
  cloud_name: "dyrnc1z2s",
  api_key: "351585889764763",
  api_secret: "5aRJzEPtXRJkm3974K0oSFTa-BY",
});

const cloudinaryupload = async (files) => {
  try {
    if (!files) return null;
    const response = await cloudinary.uploader.upload(files, {
      resource_type: "auto",
    });

    return response;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};
export { upload, cloudinaryupload };
