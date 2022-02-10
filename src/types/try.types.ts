import mongoose from 'mongoose';

export type TryDoc = mongoose.Document & {
  offerUser: string,
  joinUser: string,
  selected: boolean
}