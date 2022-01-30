import dotenv from 'dotenv';

//configuration env variables
dotenv.config();


const envVariables = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  SECRET: process.env.SECRET,
  SECURE: process.env.SECURE || false 
}

// console.log(envVariables)

export default envVariables;
