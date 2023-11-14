import express from "express";

export default (
  _: express.Request,
  __: express.Response,
  next: express.NextFunction
) => {
  

  next();
};
