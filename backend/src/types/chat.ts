import { Types } from "mongoose"

export type TFilter = {
    _id: Types.ObjectId
};

export type TOptions = {
    new: boolean,
    upsert: boolean,
    setDefaultsOnInsert: boolean,
}

