import {model, Schema} from "mongoose";
import {TMapPosition, TTranslateData} from "../utils/types";

export type TStaminaElixir = {
    name: string
    icon: string
    pos: TMapPosition
    translate: TTranslateData
    notes: Array<string>
}
const StaminaElixirSchema = new Schema<TStaminaElixir>({
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

export const StaminaElixirModel = model<TStaminaElixir>('StaminaElixir', StaminaElixirSchema)
