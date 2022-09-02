import {model, Schema} from "mongoose";
import {TMapPosition, TTranslateData} from "../utils/types";

export type TMapObject = {
    name: string
    icon: string
    pos: TMapPosition
    translate: TTranslateData
    notes: Array<string>
}
const MapObjectSchema = new Schema<TMapObject>({
    name: {type: String, required: true},
    icon: {type:String, default: ''},
    pos: {
        x: {type: Number, default: 0},
        y: {type: Number, default: 0},
    },
    translate: {
        En: {type: String, default: ''},
        Fr: {type: String, default: ''},
        Ru: {type: String, default: ''},
    },
    notes: [{type: String}],
})

export const MapObjectModel = model<TMapObject>('MapObjects', MapObjectSchema)