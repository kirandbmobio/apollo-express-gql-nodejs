import { sign } from "jsonwebtoken";
import { SECRET } from "../config";

import { pick } from "lodash";

export const issueJwtToken = async (user) => {
  let token = await sign(user, "secretKey", { expiresIn: 60 * 60 * 24 });
  return `Bearer ${token}`;
};

export const serializeUser = async (user) => {
  return pick(user, [
    "_id",
    "email",
    "username",
    "firstName",
    "lastName",
    "avatarImage",
  ]);
};
