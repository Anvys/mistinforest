import {model, Schema} from "mongoose";
import {TCrafting, TResultType, TTranslateData} from "../utils/types";

export type TRecipePart = {
    name: string
    component: string
    count: number
    type: TCrafting
    baseReq: number
}
export type TRecipe = {
    name: string
    icon: string
    // type: TCrafting
    // baseReq: number
    parts : Array<TRecipePart>
    resultType: TResultType
    translate: TTranslateData
    notes: Array<string>
}
const RecipeSchema = new Schema<TRecipe>({
    name: {type: String, required: true},
    icon: {type:String, default: ''},

    resultType: {type:String, default: 'Crowns'},

    parts: [{
        name: {type:String, required: true},
        component: {type:String, default: ''},
        count: {type:Number, default: 0},
        type: {type:String, default: 'Alchemy'},
        baseReq: {type:Number, default: 0},
    }],
    translate: {
        En: {type: String, default: ''},
        Fr: {type: String, default: ''},
        Ru: {type: String, default: ''},
    },
    notes: [{type: String}],
})

export const RecipeModel = model<TRecipe>('Recipes', RecipeSchema)
