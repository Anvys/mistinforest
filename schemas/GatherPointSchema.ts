import {TDrop, TDropTypes, TGathering, TMapPosition, TTranslateData} from "../utils/types";
import {model, Schema} from "mongoose";
import {TMaterialType} from "./MaterialSchema";
import {TComponentType} from "./ComponentSchema";

export type TGatherPoint = {
    name: string
    icon: string
    type: TGathering
    loot: string
    // drop: Array<TDrop<TDropTypes>>
    count: number
    cooldown: number
    pos: TMapPosition
    region: string
    translate: TTranslateData
    notes: Array<string>
}

const GatherPointSchema = new Schema<TGatherPoint>({
    name: {type: String, required: true},
    icon: {type: String, default: ''},

    type: {type: String, required: true},
    // drop: [{
    //     type: {type: String, required: true},
    //     name: {type: String, required: true},
    //     count: {type: Number, required: true},
    //     chance: {type: Number, default: 100},
    // }],
    count: {type: Number, required: true},
    loot: {type: String, required: true},
    cooldown: {type: Number, required: true},
    pos: {
        x: {type: Number, default: 0},
        y: {type: Number, default: 0},
    },
    region: {type: String, required: true},
    translate: {
        En: {type: String, default: ''},
        Fr: {type: String, default: ''},
        Ru: {type: String, default: ''},
    },
    notes: [{type: String}],
})

export const GatherPointModel = model<TGatherPoint>('GatherPoints', GatherPointSchema);