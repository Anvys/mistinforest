import {model, Schema} from "mongoose";
import {TBonus, TWeapons} from "../utils/types";
import {TAbility} from "./AbilitySchema";
import {commonSchemaFields, TCommonFields} from "./commonSchema";

export type TCompanion = TCommonFields & {
    type: 'Human' | 'Transport' | 'Tamed'
    evoType: 'Gold' | 'Silver'
    isBattle: boolean
    levelMax: number
    lifeMax: number
    staminaMax: number
    armorMax: number
    location: string
    evoQuests: Array<string>
    weapon: TWeapons
    weaponMaxSkill: number
    comfort: number
    skills: Array<TBonus>
    abilities: Array<TAbility>

    icon: string
}
const CompanionSchema = new Schema<TCompanion>({
    name: {type: String, required: true},
    type: {type: String, required: true},
    evoType: {type: String, required: true},
    isBattle: {type: Boolean, default: false},
    levelMax: {type: Number, required: true},
    lifeMax: {type: Number, required: true},
    staminaMax: {type: Number, required: true},
    armorMax: {type: Number, required: true},
    location: {type: String, default: ''},
    evoQuests: [{type: String, default: ''}],
    weapon: {type: String, required: true},
    icon: {type: String, default: ''},
    weaponMaxSkill: {type: Number, required: true},
    comfort: {type: Number, required: true},
    skills: [{
        skill: {type: String, required: true},
        count: {type: Number, required: true},
    }],
    abilities: [{type: Object, required: false}],
    ...commonSchemaFields
})

export const CompanionModel = model<TCompanion>('Companions', CompanionSchema)
