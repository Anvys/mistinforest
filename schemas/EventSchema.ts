import {model, Schema} from "mongoose";
import {TExpr, TMapPosition, TStageRequire, TTranslateData} from "../utils/types";
import {TLoot} from "./LootSchema";


export type TEventStage = {
    num: number
    proc: number
    expr: TExpr
    name: string
    type: string
    require: TStageRequire
    time: number
    loot: TLoot | null
}
export type TEvent = {
    name: string
    type: string
    icon:string

    stages: Array<TEventStage>
    pos: TMapPosition
    translate: TTranslateData
    notes: Array<string>
}
const EventSchema = new Schema<TEvent>({
    name: {type: String, required: true},
    type: {type: String, default: 'BlueFlag'},
    icon: {type:String, default: ''},
    stages: [{
        num: {type: Number, default: 1},
        proc: {type: Number, default: 1},

        name: {type: String, required: true},
        expr: {type: String, default: 'or'},
        type: {type: String, required: true},
        require: {type: Object , required: false},
        time: {type: Number, default: 0},
        loot: {type: String, default: null},
    }],
    pos: {
        x: {type: Number, default: 0},
        y: {type: Number, default: 0},
    },
    translate: {
        En: {type: String, default: ''},
        Fr: {type: String, default: ''},
        Ru: {type: String, default: ''},
    },
    notes: [{type: String}],
})

export const EventModel = model<TEvent>('Events', EventSchema)
