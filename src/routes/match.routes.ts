import { body } from "express-validator";
import { createMatch, createATry, getAllMatches } from "../controllers/match.controller";
import { currentUser } from '../utils/middlewares/current-user';
import { validateRequest } from '../utils/middlewares/validate-request';
import router from './auth.routes';

router.post('/', currentUser, [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("You must supply a title"),
  body("description")
    .trim()
    .optional()
],
  validateRequest, createMatch);

router.get('/', currentUser, validateRequest, getAllMatches);

router.post('/:match_id',currentUser, validateRequest, createATry )
export default router;