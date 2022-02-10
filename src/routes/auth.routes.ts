import express from 'express';
import { body } from "express-validator";
import { validateRequest } from '../utils/middlewares/validate-request';
import { isLoggedIn, login, logout, signup, updatePassword } from '../controllers/user.controller'
// import { currentUser } from '../utils/middlewares/current-user';

const router = express.Router();

router.post("/signup",
  [
    body("email").isEmail().withMessage("Email must ve valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("You must supply a username"),
    body("city")
      .trim()
      .notEmpty()
      .withMessage("You must supply a city"),
    body("picture")
      .trim()
      .optional(),
    body('type')
      .isIn(['player', 'club', 'clubWorker'])
      .withMessage('You must supply the type'),
    body('teamDimension')
      .if((_value: any, { req }: any) => req.body.type === 'club')
      .isIn(['nothing', '-9000', '10000-20000', '20000-50000', '50000-100000', '100000-'])
      .withMessage('You must supply the teamdimensions'),
    body('level')
      .if((_value: any, { req }: any) => req.body.type === 'club')
      .isIn(['amateur', 'semi-profesional', 'profesional', 'manager'])
      .withMessage('You must supply the level')
  ],
  validateRequest,
  signup);

router.post("/login",
  [
    body("email").isEmail().withMessage("Email must ve valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password")
  ],
  validateRequest,
  login);

router.post('/logout', logout)

router.post('/updatePassword', 
  [
    body("oldPassword")
      .trim()
      .notEmpty()
      .withMessage("You must supply the old password"),
    body("newPassword")
      .trim()
      .notEmpty()
      .withMessage("You must supply the new password")
  ],
  validateRequest,
  updatePassword
)

router.post('/updateProfile')


router.get('/isLoggedIn', isLoggedIn)

export default router;