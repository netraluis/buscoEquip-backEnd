import mongoose, { Schema } from 'mongoose';
import { MatchDoc } from '../types/match.types'



const matchSchemaFields = {
  tryReference: [{
    type: Schema.Types.ObjectId, ref: 'Try'
  }],
  title:{
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true
  },
  offerUser: {
    type: Schema.Types.ObjectId, ref: 'User', required: true,
    default: null
  },
  joinUser: {
    type: Schema.Types.ObjectId, ref: 'User',
    default: null
  },
  selected: {
    type: Boolean,
    required: true,
    default: false
  }
}

const MatchSchema = new mongoose.Schema<MatchDoc>(matchSchemaFields, {
  timestamps: true
});

export const Match = mongoose.model<MatchDoc>('Match', MatchSchema);
