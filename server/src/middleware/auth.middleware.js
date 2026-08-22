import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const Protect = async (req, res, next) => {
  try {

    const token = req.cookies.token;
    // console.log(token);
    
    if (!token) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      return next(error);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("decoded",decoded);
    

    const verifiedUser = await User.findById(decoded._id).select("-password");
    if (!verifiedUser) {
      const error = new Error("Unauthorized");
      console.log("not Verfide");

      error.statusCode = 401;
      return next(error);
    }

    req.user = verifiedUser;
    next();
  } catch (error) {
    const err = new Error("Unauthorized");
    err.statusCode = 401;
    next(err);
  }
};
