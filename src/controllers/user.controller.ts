import { Request, Response, NextFunction } from 'express';
import { User, UserDoc } from "../models/user.models";
import { CallbackError, NativeError } from "mongoose";
import { BadRequestError } from '../utils';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import { IVerifyOptions } from 'passport-local';
import { PassportAuthError } from '../utils/errors/passport-auth-errors';
import { hashPass } from '../utils/user';

export const signup = (req: Request, res: Response, next: NextFunction) => {

  const user = new User({
    ...req.body,
    password: hashPass(req.body.password),
  });

  User.findOne({ email: req.body.email }, (err: NativeError, existingUser: UserDoc) => {
    if (err) { return next(err); }
    if (existingUser) {
      return next(new BadRequestError("Email already exist"));
    }
    user.save({}, ((err:CallbackError)  => {
      if (err) { return next(err); }
      req.logIn(user, {}, (err) => {
        if (err) { return next(err); }
        return res.status(200).json(user);
      });
    }));
  });
}

export const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("local", (err: Error, theUser: UserDoc, failureDetails: IVerifyOptions) => {

    if (err) { return next(err); }

    if (!theUser) {
      return next(new PassportAuthError(failureDetails.message));
    }

    req.login(theUser, (err: Error) => {

      if (err) { return next(err); }

      return res.status(200).json(theUser);
    });
  })(req, res, next);
}

export const logout = (req: Request, res: Response, next: NextFunction) => {
  req.logout();
  return res.status(200).json({ message: "Log out success!" });
}

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return res.status(200).json(req.user);
  } else {
    return res.status(307).json({ message: "User isn't logged in. Redirect" });
  }
}

export const updateProfile = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as UserDoc;
  User.findById(user.id, (err: NativeError, user: UserDoc) => {
    if (err) { return next(err); }
    // user.profile.name = req.body.username || "";
    // user.profile.gender = req.body.gender || "";
    // user.profile.location = req.body.location || "";
    // user.profile.website = req.body.website || "";
  });
}

export const updatePassword = (req: Request, res: Response, next: NextFunction) => {
  const {oldPassword, newPassword } = req.body
  const user = req.user as UserDoc;
  User.findById(user.id, (err: NativeError, user: UserDoc) => {
    if (err) { return next(err); }
    if(!bcrypt.compareSync(oldPassword, user.password)){
      return next(new PassportAuthError('Insert your old password correctly'))
    }
    user.password = hashPass(newPassword);
    // (error: mongoose.CallbackError, result: T)
    user.save({}, ((err: CallbackError) => {
        if (err) { return next(err); }
        return res.status(204).json({message: 'Password correctly updated'})
    }));
});

}