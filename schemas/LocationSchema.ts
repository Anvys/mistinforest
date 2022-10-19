import {model, Schema} from "mongoose";
import {TMapPosition} from "../utils/types";
import {commonSchemaFields, TCommonFields} from "./commonSchema";

export type TLocation = TCommonFields & {
    exploreReq: number
    quest: string
    pos: TMapPosition
    icon: string
    region: string
    moveTo: string | ''
}
const LocationSchema = new Schema<TLocation>({
    name: {type: String, required: true},
    exploreReq: {type: Number, default: 0},
    quest: {type: String, default: ''},
    pos: {
        x: {type: Number, default: 0},
        y: {type: Number, default: 0},
    },
    icon: {type: String, default: ''},
    region: {type: String},
    moveTo: {type: String, default: ''},
    ...commonSchemaFields
})

export const LocationModel = model<TLocation>('Locations', LocationSchema);