import {TGathering, TMapPosition} from "../utils/types";
import {model, Schema} from "mongoose";
import {TLoot} from "./LootSchema";
import {commonSchemaFields, TCommonFields} from "./commonSchema";

export type TGatherPoint = TCommonFields & {
    icon: string
    type: TGathering
    loot: TLoot
    count: number
    cooldown: number
    pos: TMapPosition
    region: string
}

const GatherPointSchema = new Schema<TGatherPoint>({
    name: {type: String, required: true},
    icon: {type: String, default: ''},
    type: {type: String, required: true},
    count: {type: Number, required: true},
    loot: {type: Object, required: true},
    cooldown: {type: Number, required: true},
    pos: {
        x: {type: Number, default: 0},
        y: {type: Number, default: 0},
    },
    region: {type: String, required: true},
    ...commonSchemaFields
})

export const GatherPointModel = model<TGatherPoint>('GatherPoints', GatherPointSchema);