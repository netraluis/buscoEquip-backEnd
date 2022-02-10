import { Request, Response, NextFunction } from "express";
import { UserCommon } from "../types/user.types";
import { Match } from "../models/match.models";
import { TryModel } from "../models/try.models";
import { CallbackError, NativeError } from "mongoose";
import { MatchDoc } from "../types/match.types";
import mongoose from 'mongoose';
import { NotFoundError } from "../utils";
import { TryDoc } from "../types/try.types";
import { IncorrectType } from "../utils/errors/incorrect-type";

export const createMatch = (req: Request, res: Response, next: NextFunction) => {

  const match = new Match({
    joinUser: null,
    tryReference: [],
    title: req.body.title,
    description: req.body.description ? req.body.description : null,
    type: 'player',
    offerUser: (req.user as UserCommon).id,
    selected: false
  });
  match.save({}, ((err: CallbackError) => {
    if (err) { return next(err); }
    return res.status(200).json(match);
  }));
}

export const getAllMatches = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as UserCommon
  const query: any = {}
  if (user.type !== 'player') {
    query.offerUser = user.id
  }
  Match.find(query, (err: NativeError, matches: MatchDoc) => {
    if (err) { return next(err); }
    return res.status(200).json(matches);
  });
}

export const createATry = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as UserCommon
  const { match_id } = req.params

  Match.findById(match_id)
    .populate('tryReference')
    .exec(async (err: mongoose.CallbackError, matches: MatchDoc | null) => {
      if (err) { return next(err); }
      if (!matches) { return next(new NotFoundError()) }

      if (user.type === 'player' && matches.tryReference) {
        const exist = (matches.tryReference as TryDoc[]).find(el => el.joinUser === user.id)
        if (exist) { return res.status(201).json(exist); }

        const tryVar = new TryModel({
          offerUser: matches.offerUser,
          joinUser: user.id,
          selected: false
        });

        tryVar.save({}, ((err: CallbackError, result: TryDoc) => {
          if (err) { return next(err); }
          matches.tryReference.push(result.id)
          matches.save({}, ((err: CallbackError, matches: MatchDoc) => {
            if (err) { return next(err); }
            return res.status(201).json(matches);
          }))
        }));
      }else{
        return next(new IncorrectType())
      }
    })
}
