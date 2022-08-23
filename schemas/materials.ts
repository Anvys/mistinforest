import {InferSchemaType, model, Schema} from "mongoose";
import {IResources} from "../utils/types";

type TMaterialType = 'Bone' | 'Fiber' | 'Leather' | 'Metal' | 'Stone' | 'Wood'
type TMaterialAttributes = {
    Absorbity: number
    Density: number
    Flexibility: number
    Hardness: number
    Lightness: number
    Purity: number
    Radiance: number
    Rigidity: number
}
export type TMaterials = IResources<TMaterialType, TMaterialAttributes>

/** Resources interface
 * T: resource type Type (TMaterialType | TComponentType)
 * U: attributes Type (TMaterialAttributes | TComponentAttributes)
 */


const MaterialsSchema = new Schema<TMaterials>({

    name: {type: String, required: true},
    type: {type: String, required: true},
    durability: {type: Number, required: true},
    difficulty: {type: Number, required: true},
    attributes: {
        Absorbity: {type: Number, default: 0},
        Density: {type: Number, default: 0},
        Flexibility: {type: Number, default: 0},
        Hardness: {type: Number, default: 0},
        Lightness: {type: Number, default: 0},
        Purity: {type: Number, default: 0},
        Radiance: {type: Number, default: 0},
        Rigidity: {type: Number, default: 0},
    },
    tier: {type: Number, required: true},
    goldCost: {type: Number, default: 0},
    encumbrance: {type: Number, default: 0},
    translate: {
        En: {type: String, default: ''},
        Fr: {type: String, default: ''},
        Ru: {type: String, default: ''},
    },
})

export type TMaterialsSchema = InferSchemaType<typeof MaterialsSchema>
export const materialModel =  model<TMaterials>('materials', MaterialsSchema)