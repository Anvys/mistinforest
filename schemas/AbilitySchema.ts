import {model, Schema} from "mongoose";
import {TAbilityType, TTranslateData} from "../utils/types";
import {commonSchemaFields, TCommonFields} from "./commonSchema";


export type TAbility = TCommonFields & {
    type: TAbilityType
    level: number
    stamina: number
    cd: number
    effect: string
    icon: string
}
const AbilitySchema = new Schema<TAbility>({
    name: {type: String, required: true},
    type: {type: String, default: 'Passive'},
    level: {type: Number, required: true},
    stamina: {type: Number, required: true},
    cd: {type: Number, default: 0},
    effect: {type: String, required: true},
    icon: {type: String, default: ''},
    ...commonSchemaFields
})

export const AbilityModel = model<TAbility>('Ability', AbilitySchema)
