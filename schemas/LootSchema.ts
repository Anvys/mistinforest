import {model, Schema} from "mongoose";
import {TDrop, TDropTypes, TTranslateData} from "../utils/types";

export type TLoot = {
    name: string
    loot: Array<TDrop<TDropTypes>>
    translate: TTranslateData
    notes: Array<string>
}
const LootSchema = new Schema<TLoot>({
    name: {type: String, required: true},
    loot: [{
        type: {type: String, required: true},
        name: {type: String, required: true},
        count: {type: Number, required: true},
        chance: {type: Number, default: 100},
    }],
    translate: {
        En: {type: String, default: ''},
        Fr: {type: String, default: ''},
        Ru: {type: String, default: ''},
    },
    notes: [{type: String}],
})

export const LootModel = model<TLoot>('Loot', LootSchema)
