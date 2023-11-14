import express from "express";
import { UserModel } from "../models";

export default (
  _: express.Request,
  __: express.Response,
  next: express.NextFunction
) => {
  UserModel.updateOne(
    {
      _id: "4564464",
    },
    {
      $set: {
        fullname: "ghv",
        last_seen: new Date(),
      },
    }
  );

  next();
};
