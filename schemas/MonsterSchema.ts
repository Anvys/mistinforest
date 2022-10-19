import {model, Schema} from "mongoose";
import {TMonsterType} from "../utils/types";
import {TLoot} from "./LootSchema";
import {TAbility} from "./AbilitySchema";
import {commonSchemaFields, TCommonFields} from "./commonSchema";


export type TMonster = TCommonFields & {
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
    loot: {type: Object, default: null},
    region: {type: String, required: true},
    icon: {type: String, default: ''},
    ...commonSchemaFields
})

export const MonsterModel = model<TMonster>('Monsters', MonsterSchema)
