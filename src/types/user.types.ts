import mongoose from 'mongoose';

export type UserDoc = mongoose.Document & {
  _id: string,
  email: string;
  password: string;
  username: string;
  city: string;
  picture: string | null;
}

export type UserCommon = UserPlayer | UserClub | UserClubWorker

export interface UserPlayer extends UserDoc {
  type: 'player', 
  club_worker_id: string | null,
  club_id: string | null,
  selected: boolean
}

export interface UserClubWorker extends UserDoc {
  type: 'clubWorker',
  place: string | null,
  club_id: string | null,
  selected: boolean
}

export interface UserClub extends UserDoc {
  type: 'club',
  teamDimensions: 'nothing' | '-9000' | '10000-20000' | '20000-50000' | '50000-100000' | '100000-',
  level: 'amateur' | 'semi-profesional' | 'profesional' | 'manager'
}