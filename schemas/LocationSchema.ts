import {model, Schema} from "mongoose";
import {TMapPosition, TTranslateData} from "../utils/types";

export type TLocation = {
    name: string
    exploreReq: number
    pos: TMapPosition
    icon: string
    region: string
    translate: TTranslateData
    notes: Array<string>
}
const LocationSchema = new Schema<TLocation>({
    name: {type: String, required: true},
    exploreReq: {type: Number, default: 0},
    pos: {
        x: {type: Number, default: 0},
        y: {type: Number, default: 0},
    },
    icon: {type: String, default: ''},
    region: {type: String},
    translate: {
        En: {type: String, default: ''},
        Fr: {type: String, default: ''},
        Ru: {type: String, default: ''},
    },
    notes: [{type: String}],
})

export const LocationModel = model<TLocation>('Locations', LocationSchema);