import {TGathering, TMapPosition} from "../utils/types";
import {model, Schema} from "mongoose";

export type TGatherPoint = {
    name: string
    type: TGathering
    count: number
    cooldown: number
    pos: TMapPosition
    region: string
}

const GatherPointSchema = new Schema<TGatherPoint>({
    name: {type: String, required: true},
    type: {type: String, required: true},
    count: {type: Number, required: true},
    cooldown: {type: Number, required: true},
    pos: {
        x: {type: Number, default: 0},
        y: {type: Number, default: 0},
    },
    region: {type: String},
})

export const GatherPointModel = model<TGatherPoint>('GatherPoints', GatherPointSchema);