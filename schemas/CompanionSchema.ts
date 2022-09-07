import {model, Schema} from "mongoose";
import {TBonus, TSkills, TTranslateData, TWeapons} from "../utils/types";

export type TCompanion = {
    name: string
    type: 'Human' | 'Transport' | 'Tamed'
    evoType: 'Gold' | 'Silver'
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


    translate: TTranslateData
    notes: Array<string>
}
const CompanionSchema = new Schema<TCompanion>({
    name: {type: String, required: true},
    type: {type: String, required: true},
    evoType: {type: String, required: true},
    levelMax: {type: Number, required: true},
    lifeMax: {type: Number, required: true},
    staminaMax: {type: Number, required: true},
    armorMax: {type: Number, required: true},
    location: {type:String, default: ''},
    evoQuests: [{type: String, default: ''}],
    weapon: {type: String, required: true},
    weaponMaxSkill: {type: Number, required: true},
    comfort: {type: Number, required: true},
    skills: [{
        skill: {type: String, required: true},
        count: {type: Number, required: true},
    }],

    translate: {
        En: {type: String, default: ''},
        Fr: {type: String, default: ''},
        Ru: {type: String, default: ''},
    },
    notes: [{type: String}],
})

export const CompanionModel = model<TCompanion>('Companions', CompanionSchema)
