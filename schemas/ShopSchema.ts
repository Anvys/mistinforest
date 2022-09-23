import {model, Schema} from "mongoose";
import {TReputation, TTranslateData} from "../utils/types";
import {TRecipe} from "./RecipeSchema";
import {TAbility} from "./AbilitySchema";

export type TEquip = {
    recipe: TRecipe
    components:Array<string>
}
export type TShopContentItem = TRecipe | TAbility | TEquip
export type TShopContentType = 'Recipe' | 'Ability' | 'Equip'
export type TReputationRequire = {
    reputation: TReputation
    count: number
}
export type TShopContent = {
    type: TShopContentType
    item: TShopContentItem
    count: number
    price: number
    reputationRequire: TReputationRequire | null
}
export type TShop = {
    name: string
    npc: string
    content: TShopContent

    icon: string
    translate: TTranslateData
    notes: Array<string>
}
const ShopSchema = new Schema<TShop>({
    name: {type: String, required: true},
    npc: {type: String, required: true},
    content: [{
        type: {type: String, required: true},
        item: {type: Object, required: true},
        count: {type: Number, default: -1},
        price: {type: Number, required: true},
        reputationRequire: {
            reputation: {type: String, required: false},
            count: {type: Number, default: 0},
        }
    }],

    icon: {type: String, required: true},
    translate: {
        En: {type: String, default: ''},
        Fr: {type: String, default: ''},
        Ru: {type: String, default: ''},
    },
    notes: [{type: String}],
})

export const ShopModel = model<TShop>('Shop', ShopSchema)
