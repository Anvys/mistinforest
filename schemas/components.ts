import {InferSchemaType, model, Schema} from "mongoose";
import {IResources} from "../utils/types";

type TComponentType = 'Plant' | 'Gem' | 'Substance' | 'Powder' | 'Sap' | 'Pollen' | 'Artefact'
type TComponentAttributes = {
    Activator: number
    Binder: number
    Deteriorator: number
    Energizer: number
    Focuser: number
    Fortifier: number
    Putrefier: number
    Stimulator: number
    Toner: number
    Tranquilizer: number
    Elioam: number
    Frimam: number
    Hydram: number
    Lectram: number
    Lithram: number
    Magnam: number
    Psycham: number
    Pyram: number
    Stratam: number
}
export type TComponents = IResources<TComponentType, TComponentAttributes>

const ComponentsSchema = new Schema<TComponents>({
    name: {type: String, required: true},
    type: {type: String, required: true},
    durability: {type: Number, required: true},
    difficulty: {type: Number, required: true},
    attributes: {
        Activator: {type: Number, default: 0},
        Binder: {type: Number, default: 0},
        Deteriorator: {type: Number, default: 0},
        Energizer: {type: Number, default: 0},
        Focuser: {type: Number, default: 0},
        Fortifier: {type: Number, default: 0},
        Putrefier: {type: Number, default: 0},
        Stimulator: {type: Number, default: 0},
        Toner: {type: Number, default: 0},
        Tranquilizer: {type: Number, default: 0},
        Elioam: {type: Number, default: 0},
        Frimam: {type: Number, default: 0},
        Hydram: {type: Number, default: 0},
        Lectram: {type: Number, default: 0},
        Lithram: {type: Number, default: 0},
        Magnam: {type: Number, default: 0},
        Psycham: {type: Number, default: 0},
        Pyram: {type: Number, default: 0},
        Stratam: {type: Number, default: 0},
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
export type TComponentsSchema = InferSchemaType<typeof ComponentsSchema>
export const componentModel =  model<TComponents>('components', ComponentsSchema)