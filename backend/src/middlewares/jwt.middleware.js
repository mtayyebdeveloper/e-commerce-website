import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";

const jwtMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    const replacetoken = token.replace("token", "").trim();

    const verifieduser = jwt.verify(replacetoken, process.env.JWT_SECRET);

    if (!verifieduser) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await User.findById({ _id: verifieduser.id });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};



export default jwtMiddleware