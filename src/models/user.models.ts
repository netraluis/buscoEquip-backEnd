import mongoose from 'mongoose';

// declare global {
//   namespace Express {
//       export interface Request {
//           user?: UserDoc
//       }

//       interface User {
//           [_: string]: any;
//       }
//   }
// }

// An interface that describes the properties
// that are requried to create a new User
export type UserDoc = mongoose.Document & userCommon & {
  email: string;
  password: string;
  username: string;
  city: string;
  picture: string;
}

type userCommon = UserPlayer | UserClub | UserClubWorker

interface UserPlayer {
  type: 'player'
}

interface UserClubWorker {
  type: 'clubWorker',
  place?: string,
  club?: string
}

interface UserClub {
  type: 'club',
  teamDimensions: 'nothing' | '-9000' | '10000-20000' | '20000-50000' | '50000-100000' | '100000-',
  level: 'amateur' | 'semi-profesional' | 'profesional' | 'manager'
}


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
    default: ''
  },
  type: {
    type: String,
    required: true
  },
  dimensions: {
    type: String,
    required: false
  },
  level: {
    type: String,
    required: false
  }
}

// const UserSchema = new mongoose.Schema<UserAttrs,mongoose.Model<UserAttrs>, UserDoc>(userSchemaFields, {
//   // toJSON: {
//   //   transform(doc, ret){
//   //     ret.id = ret._id;
//   //     delete ret._id;
//   //     delete ret.password;
//   //   },
//   //   versionKey: false
//   // }
// });

const UserSchema = new mongoose.Schema<UserDoc>(userSchemaFields, {
  timestamps: true,
    toJSON: {
    transform(doc, ret){
      delete ret.password;
    },
    versionKey: false
  }
});

export const User = mongoose.model<UserDoc>('User', UserSchema);
