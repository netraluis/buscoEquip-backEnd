import { Request, Response, NextFunction } from "express";

import { NotAuthorizedError } from "..";

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    if (req.isAuthenticated()) {
      return next();
    }else{
      return next(new NotAuthorizedError())
    }
  } catch (err) {
    return next(err)
  }
};
