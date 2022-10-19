import {model, Schema} from "mongoose";
import {TExpr, TMapPosition, TStageRequire} from "../utils/types";
import {TLoot} from "./LootSchema";
import {commonSchemaFields, TCommonFields} from "./commonSchema";


export type TEventStage = {
    num: number
    proc: number
    expr: TExpr
    name: string
    type: string
    require: TStageRequire
    time: number
    // loot: TLoot | null
}
export type TEvent = TCommonFields & {
    type: string
    icon: string
    region: string
    eStages: Array<TEventStage>
    loot: TLoot | null
    pos: TMapPosition
}
const EventSchema = new Schema<TEvent>({
    name: {type: String, required: true},
    type: {type: String, default: 'BlueFlag'},
    region: {type: String, required: true},
    icon: {type: String, default: ''},
    eStages: [{
        num: {type: Number, default: 1},
        proc: {type: Number, default: 1},

        name: {type: String, required: true},
        expr: {type: String, default: 'or'},
        type: {type: String, required: true},
        require: {type: Object, required: false},
        time: {type: Number, default: 0},
    }],
    loot: {type: Object, default: null},
    pos: {
        x: {type: Number, default: 0},
        y: {type: Number, default: 0},
    },
    ...commonSchemaFields
})

export const EventModel = model<TEvent>('Events', EventSchema)
