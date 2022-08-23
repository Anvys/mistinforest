import {model, Schema} from "mongoose";
import {TTerrain, TTranslateData} from "../utils/types";


export type TRegion = {
    name: string
    terrain: TTerrain
    terrainReq: number
    translate: TTranslateData
}
const RegionSchema = new Schema<TRegion>({
    name: {type: String, required: true},
    terrain: {type:String, default: 'Urban'},
    terrainReq: {type: Number, default: 0},
    translate: {
        En: {type: String, default: ''},
        Fr: {type: String, default: ''},
        Ru: {type: String, default: ''},
    },
})

export const RegionModel = model<TRegion>('Regions', RegionSchema)
