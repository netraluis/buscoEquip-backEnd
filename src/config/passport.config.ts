import passport from 'passport';
import local_strategy from 'passport-local';
import bcrypt from 'bcryptjs';
import { UserCommon } from '../types/user.types';
import { User } from '../models/user.models';
import { NativeError } from "mongoose";
import { PassportAuthError } from '../utils/errors/passport-auth-errors';


const LocalStrategy = local_strategy.Strategy

export default (app: any) => {
  // Identificará a un usuario con una sesión (Asignará a la sesión el id del usuario)
  passport.serializeUser<any,any>((req,user, cb) => {
    cb(undefined, user);
  });

  // Identificará a qué usuario pertenece la sesión
  passport.deserializeUser((id, cb) => {
    User.findById(id, (err: NativeError, user: UserCommon) => cb(err, user));
  });

  // Local Strategy
  passport.use(
    new LocalStrategy(
      { passReqToCallback: true, usernameField: 'email' },
      (req, email, password, next) => {
        User.findOne({ email: email.toLocaleLowerCase() })
          .then((user) => {
            if (!user || !bcrypt.compareSync(password, user.password)) {
              return next(new PassportAuthError('Incorrect user or password'));
            }
            return next(null, user);
          })
          .catch((error) => next(error));
      }
    )
  );
  app.use(passport.initialize());
  app.use(passport.session());
};