import {model, Schema} from "mongoose";
import {TMapPosition} from "../utils/types";
import {commonSchemaFields, TCommonFields} from "./commonSchema";

export type TStaminaElixir = TCommonFields & {
    icon: string
    pos: TMapPosition
}
const StaminaElixirSchema = new Schema<TStaminaElixir>({
    name: {type: String, required: true},
    icon: {type: String, default: ''},
    pos: {
        x: {type: Number, default: 0},
        y: {type: Number, default: 0},
    },
    ...commonSchemaFields
})

export const StaminaElixirModel = model<TStaminaElixir>('StaminaElixir', StaminaElixirSchema)
