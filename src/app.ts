import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import { errorHandler, NotFoundError } from './utils/index';
import  morgan  from 'morgan';
import  helmet  from 'helmet'
import  rateLimit from 'express-rate-limit';
import user from './routes/user.routes';
import passportConfig from './config/passport.config';
import sessionConfig from './config/session.config';

// import { currentUserRouter } from './routes/current-user';
// import { signinRouter } from './routes/signin';
// import { signoutRouter } from './routes/signout';
// import { signupRouter } from './routes/signup';

const app = express();
app.use(json())

//security http headers
app.use(helmet());

// morgan more information in the request
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//app has been proxyed by ingress and gnex
// app.set('trust proxy', true);

//limiter reques flom same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in a hour!',
});
app.use('/api', limiter);

//to be able to use req.body with a limited weight
app.use(express.json({ limit: '10kb' }));


sessionConfig(app)
passportConfig(app)



// app.use(currentUserRouter);
// app.use(signinRouter);
// app.use(signoutRouter);
// app.use(signupRouter);
app.use('/api/v1/auth',user)
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError());
})
app.use(errorHandler);

export { app };