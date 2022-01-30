import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { app } from './app' 
import envVaribales from './env.config'

//configuration env variables
dotenv.config();

//Database conection
if(!envVaribales.MONGO_URI){
  throw new Error('MONGO_URI must be defined')
}
mongoose
  .connect(envVaribales.MONGO_URI, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
  .then(() => {
    console.log('DB connection succesful!');
  });
process.on('uncaughtException', (err: Error) => {
  console.log(`Error name: ${err.name}`, `.Error message: ${err.message}`);
  console.log('UNCAUGHT REJECTION');
  process.exit(1);
});
const port = envVaribales.PORT;
const server = app.listen(port, () => {
  console.log(`App runin on port ${port}...`);
});

process.on('unhandledRejection', (err: Error) => {
  console.log(`Error name: ${err.name}`, `.Error message: ${err.message}`);
  console.log('UNHANDLED REJECTION');
  server.close(() => {
    process.exit(1);
  });
});