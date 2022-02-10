import mongoose, { Schema } from 'mongoose';
import { TryDoc } from '../types/try.types';


const trySchemaFields = {
  // chatReference: {
  //   type: String,
  //   required: true,
  //   default: null
  // },
  offerUser: {
    type: Schema.Types.ObjectId, ref: 'User', equired: true,
    required: true,
    default: null
  },
  joinUser: {
    type: String,
    required: true,
    default: null
  },
  selected: {
    type: Boolean,
    required: true,
    default: false
  }
}

const TrySchema = new mongoose.Schema<TryDoc>(trySchemaFields, {
  timestamps: true
});

export const TryModel = mongoose.model<TryDoc>('Try', TrySchema);