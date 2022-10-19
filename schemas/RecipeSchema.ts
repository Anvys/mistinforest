import {model, Schema} from "mongoose";
import {TCrafting, TResultType} from "../utils/types";
import {commonSchemaFields, TCommonFields} from "./commonSchema";

export type TRecipePart = {
    name: string
    component: string
    count: number
    type: TCrafting
    baseReq: number
}
export type TRecipe = TCommonFields & {
    icon: string
    parts: Array<TRecipePart>
    resultType: TResultType
}
const RecipeSchema = new Schema<TRecipe>({
    name: {type: String, required: true},
    icon: {type: String, default: ''},
    resultType: {type: String, default: 'Crowns'},
    parts: [{
        name: {type: String, required: true},
        component: {type: String, default: ''},
        count: {type: Number, default: 0},
        type: {type: String, default: 'Alchemy'},
        baseReq: {type: Number, default: 0},
    }],
    ...commonSchemaFields
})

export const RecipeModel = model<TRecipe>('Recipes', RecipeSchema)
