import session from 'express-session';
import MongoStore from 'connect-mongo';
import envVariables from '../env.config';

export default (app: any) => {
  
  if(!envVariables.SECRET){
    throw new Error('SECRET must be defined')
  }

  if(!envVariables.MONGO_URI){
    throw new Error('MONGO_URI must be defined')
  }

  app.use(
    session({
      secret: envVariables.SECRET,
      resave: true,
      saveUninitialized: true,
      cookie: {
        maxAge: 3600000,
        secure: false
      },
      // store: MongoStore.create({mongoUrl: 'mongodb+srv://equip:Sabado10@cluster0.3xhdk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'})
      store:  MongoStore.create({
        mongoUrl: envVariables.MONGO_URI
      }),
    })
  );
}
// react cookies
// https://stackoverflow.com/questions/56603564/cookie-is-not-set-using-express-and-passport