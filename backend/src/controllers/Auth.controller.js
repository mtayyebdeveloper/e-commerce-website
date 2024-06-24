import { TryCatch } from "../middlewares/error_handle.middleware.js";
import { User } from "../models/User.model.js";
import { cloudinaryupload } from "../middlewares/files.middleware.js";

const HomeController = TryCatch(async (req, res) => {
  res.send("hello world");
});

const getUserController = TryCatch(async (req, res) => {
  const _id =req.user._id
  const user = await User.findOne({ _id });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "user not found",
    });
  }
  res.status(200).json({
    success: true,
    message: "user found",
    user
  });
});

const RegisterController = TryCatch(async (req, res) => {
  const file = req.file;
  const { name, username, email,phone, password } = req.body;

  if (!file) {
    return res.status(201).json({
      message: "image is required",
    });
  }

  if (!name || !username || !email ||!phone || !password) {
    return res.status(201).json({
      message: "all fields are required",
    });
  }

  const emailExist = await User.findOne({ email });
  if (emailExist) {
    return res.status(201).json({
      message: "email already exist",
    });
  }

  const usernameExist = await User.findOne({ username });
  if (usernameExist) {
    return res.status(201).json({
      message: "username already exist",
    });
  }

  const image = await cloudinaryupload(file.path);

  const user = await User.create({
    name,
    username,
    email,
    password,
    phone,
    avatar: {
      public_id: image.public_id,
      url: image.url,
    },
  });

  if (!user) {
    return res.status(400).json({
      message: "something went wrong",
    });
  }

  res.status(200).json({
    message: "register successfully",
    user,
  });
});

const LoginController = TryCatch(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(201).json({
      message: "all fields are required",
    });
  }

  const Emailmatch = await User.findOne({ email });
  if (!Emailmatch) {
    return res.status(201).json({
      message: "Invalid Email",
    });
  }

  const isMatch = await Emailmatch.comparePassword(password);
  if (!isMatch) {
    return res.status(201).json({
      message: "invalid password",
    });
  }

  res.status(200).json({
    message: "login successfully",
    user: Emailmatch,
    token: Emailmatch.getJwtToken(),
  });
});

export { HomeController, RegisterController, LoginController,getUserController };
