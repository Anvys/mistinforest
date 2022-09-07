import {model, Schema} from "mongoose";
import {TCrafting, TTranslateData} from "../utils/types";

export type TRecipePart = {
    name: string
    component: string
    count: number
}
export type TRecipe = {
    name: string
    icon: string
    type: TCrafting
    baseReq: number
    parts : Array<TRecipePart>
    translate: TTranslateData
    notes: Array<string>
}
const RecipeSchema = new Schema<TRecipe>({
    name: {type: String, required: true},
    icon: {type:String, default: ''},
    type: {type:String, default: 'Alchemy'},
    baseReq: {type:Number, default: 0},
    parts: [{
        name: {type:String, required: true},
        component: {type:String, default: ''},
        count: {type:Number, default: 0},
    }],
    translate: {
        En: {type: String, default: ''},
        Fr: {type: String, default: ''},
        Ru: {type: String, default: ''},
    },
    notes: [{type: String}],
})

export const RecipeModel = model<TRecipe>('Recipes', RecipeSchema)
