import {TMaterials} from "../schemas/materials";
import {TComponents} from "../schemas/components";

export interface IResources<T, U> {
    name: string
    type: T
    durability: number
    difficulty: number
    tier: number
    attributes: U
    goldCost: number
    encumbrance: number
    translate: TTranslateData
}

export type TTranslateLang = 'En' | 'Fr' | 'Ru'
export type TTranslateLangObj = Partial<Record<TTranslateLang, string>>
export type TTranslateData = TTranslateLangObj//Array<TTranslateLangObj>

export type TMapPosition = { x: number, y: number }

export type TWeapons = 'Axe' | 'Dagger' | 'Mace' | 'Polearm' | 'Staff' | 'Sword';
export type TAdventure = 'Academic' | 'Athletics' | 'Exploration'
    | 'Perception' | 'Persuasion' | 'Strategy' | 'Subterfuge';
export type TCrafting = 'Alchemy' | 'Forge' | 'Herbalism' | 'Sewing' | 'Stoneworking' | 'Tanning' | 'Woodworking'
export type TGathering = 'Botany' | 'Hunting' | 'Lumberjacking' | 'Mining'
export type TTerrain = 'Forest' | 'Mountain' | 'Swamp' | 'Underground' | 'Desert' | 'Mists' | 'Urban'
export type TGuild =
    'Arcanists'
    | 'Circle of the Great Tree'
    | 'Claw Assembly'
    | 'Lunar caravan'
    | 'Mistwalkers'
    | 'Order of the Hippogriff'
    | 'Protector of the Rose'
export type TReputation = 'Gantras' | 'Kortombe' | 'Larcen' | 'Thorval' | 'Wellnear'


export type TResourceRequestBody<T = TMaterials | TComponents, U = 'Component' | 'Material'> = {
    type: U
    resource: T
}
export type TResponseBody<T> = {
    status: number
    msg: Array<string>
    data: Array<T>
}
export type TRequestBody<T> = {
    type: string
    data: T
}
export type TResponseSingleBody<T = TComponents | TMaterials> = TResponseBody<Array<T>>
export type TResponseAllBody = TResponseBody<{ materials: Array<TMaterials>, components: Array<TComponents> }>
