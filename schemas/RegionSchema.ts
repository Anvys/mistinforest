import {model, Schema} from "mongoose";
import {TMapPosition, TTerrain} from "../utils/types";
import {commonSchemaFields, TCommonFields} from "./commonSchema";


export type TRegion = TCommonFields & {
    terrain: TTerrain
    terrainReq: number
    bound: Array<Array<number>>
    pos: TMapPosition
}
const RegionSchema = new Schema<TRegion>({
    name: {type: String, required: true},
    terrain: {type: String, default: 'Urban'},
    terrainReq: {type: Number, default: 0},
    bound: [[{type: Number, required: false}]],
    pos: {
        x: {type: Number, default: 0},
        y: {type: Number, default: 0},
    },
    ...commonSchemaFields
})

export const RegionModel = model<TRegion>('Regions', RegionSchema)
