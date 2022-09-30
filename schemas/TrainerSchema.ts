import {model, Schema} from "mongoose";
import {TAdventure, TTranslateData} from "../utils/types";
import {TLocation} from "./LocationSchema";

export type TRewCost = { type: string, name: string, count: number }
export type TTrainer = {
    name: string
    type: TAdventure
    difficult: number
    time: number
    cooldown: number
    cost: TRewCost
    reward: TRewCost
    location: string
    translate: TTranslateData
    notes: Array<string>
}
const TrainerSchema = new Schema<TTrainer>({
    name: {type: String, required: true},
    type: {type: String, default: 'Academic'},
    difficult: {type: Number, default: 1},
    time: {type: Number, default: 30},
    cooldown: {type: Number, default: 120},
    cost: {
        type: {type: String, default: ''},
        name: {type: String, default: ''},
        count: {type: Number, default: 1},
    },
    reward: {
        type: {type: String, default: ''},
        name: {type: String, default: ''},
        count: {type: Number, default: 1},
    },

    location: {type: String, required: true},
    translate: {
        En: {type: String, default: ''},
        Fr: {type: String, default: ''},
        Ru: {type: String, default: ''},
    },
    notes: [{type: String}],
})

export const TrainerModel = model<TTrainer>('Trainers', TrainerSchema)
