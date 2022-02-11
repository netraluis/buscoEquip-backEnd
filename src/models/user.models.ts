import mongoose from 'mongoose';
import { UserCommon } from '../types/user.types'

const userSchemaFields = {
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    default: null
  },
  type: {
    type: String,
    required: true
  },
  teamDimensions: {
    type: String,
    required: false
  },
  level: {
    type: String,
    required: false
  },
  club_worker_id: {
    type: String,
    required: false
  },
  club_id: {
    type: String,
    required: false
  }
}

const UserSchema = new mongoose.Schema<UserCommon>(userSchemaFields, {
  timestamps: true,
    toJSON: {
    transform(doc, ret){
      delete ret.password;
    },
    versionKey: false
  }
});

export const User = mongoose.model<UserCommon>('User', UserSchema);
