import mongoose from 'mongoose';
import { TryDoc } from './try.types';

export type MatchDoc = mongoose.Document & {
  tryReference: string[] | TryDoc[], 
  type: string,
  title: string,
  description: string | null,
  offerUser: string | null,
  joinUser: string | null,
  selected: boolean
}