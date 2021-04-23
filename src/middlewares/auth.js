import { verify } from "jsonwebtoken";
import { User } from "../models";

const AuthMiddleware = async (req, res, next) => {
  let authHeaders = req.get("Authorization");

  if (!authHeaders) {
    req.isAuth = false;
    return next();
  }

  /* extract from auth header */
  let token = authHeaders.split(" ")[1];
  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }
  /* decode auth token */
  let decodedToken;
  try {
    decodedToken = verify(token, "secretKey");
  } catch (err) {
    req.isAuth = false;
    return next(err);
  }

  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  /* find the user from database */
  let authUser = await User.findById(decodedToken._id);
  if (!authUser) {
    req.isAuth = false;
    return next();
  }
  req.user = authUser;
  req.isAuth = true;
  next();
};

export default AuthMiddleware;
