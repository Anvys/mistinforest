import {model, Schema} from "mongoose";
import {TMonsterType, TTranslateData} from "../utils/types";
import {TLoot} from "./LootSchema";
import {TAbility} from "./AbilitySchema";


export type TMonster = {
    name: string
    type: TMonsterType
    level: number
    life: number
    stamina: number
    attack: number
    armor: number
    abilities: Array<TAbility>
    loot: TLoot | null
    region: string
    icon: string
    translate: TTranslateData
    notes: Array<string>
}
const MonsterSchema = new Schema<TMonster>({
    name: {type: String, required: true},
    type: {type: String, default: 'Monster'},
    level: {type: Number, required: true},
    life: {type: Number, required: true},
    stamina: {type: Number, required: true},
    attack: {type: Number, required: true},
    armor: {type: Number, required: true},
    abilities: [{type: Object, required: false}],
    loot: {type: String, default: null},
    region: {type: String, required: true},
    icon: {type: String, default: ''},
    translate: {
        En: {type: String, default: ''},
        Fr: {type: String, default: ''},
        Ru: {type: String, default: ''},
    },
    notes: [{type: String}],
})

export const MonsterModel = model<TMonster>('Monsters', MonsterSchema)
