import jwt from "jwtwebtoken";
import { reduce } from "lodash";
import { IUser } from "../models/User";

export default (user: IUser) => {
  let token = jwt.sign(
    {
      data: reduce(
        user,
        (result, value, key) => {
          if (key != "password") {
            result[key] = value;
          }
          return result;
        },
        {}
      ),
    },
    process.env.JWT_KEY,
    {
      expiresIn: process.env.JWT_MAX_AGE,
      algorithm: "HS256",
    }
  );

  return token;
};
