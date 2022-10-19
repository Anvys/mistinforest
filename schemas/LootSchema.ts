import {model, Schema} from "mongoose";
import {TDrop, TDropTypes} from "../utils/types";
import {commonSchemaFields, TCommonFields} from "./commonSchema";

export type TLoot = TCommonFields & {
    loot: Array<TDrop<TDropTypes>>
}
const LootSchema = new Schema<TLoot>({
    name: {type: String, required: true},
    loot: [{
        type: {type: String, required: true},
        name: {type: String, required: true},
        countMin: {type: Number, required: true},
        countMax: {type: Number, required: true},
        chance: {type: Number, default: 100},
    }],
    ...commonSchemaFields
})

export const LootModel = model<TLoot>('Loot', LootSchema)
