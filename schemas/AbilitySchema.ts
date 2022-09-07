import {model, Schema} from "mongoose";
import {TAbilityType, TTranslateData} from "../utils/types";
import {TLoot} from "./LootSchema";


export type TAbility = {
    name: string
    type: TAbilityType
    level: number
    stamina: number
    effect: string
    icon: string
    translate: TTranslateData
    notes: Array<string>
}
const AbilitySchema = new Schema<TAbility>({
    name: {type: String, required: true},
    type: {type: String, default: 'Passive'},
    level: {type: Number, required: true},
    stamina: {type: Number, required: true},
    effect: {type: String, required: true},
    icon: {type: String, required: true},
    translate: {
        En: {type: String, default: ''},
        Fr: {type: String, default: ''},
        Ru: {type: String, default: ''},
    },
    notes: [{type: String}],
})

export const AbilityModel = model<TAbility>('Ability', AbilitySchema)
