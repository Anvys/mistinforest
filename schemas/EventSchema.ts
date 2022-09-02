import {model, Schema} from "mongoose";
import {TMapPosition, TTranslateData} from "../utils/types";
import {TLoot} from "./LootSchema";

export type TStage = {
    name: string
    type: string
    require: string
    loot: TLoot | null
}
export type TEvent = {
    name: string
    type: string
    stages: Array<TStage>
    pos: TMapPosition
    translate: TTranslateData
    notes: Array<string>
}
const EventSchema = new Schema<TEvent>({
    name: {type: String, required: true},
    type: {type: String, default: 'Urban'},
    stages: [{
        name: {type: String, required: true},
        type: {type: String, required: true},
        require: {type: String, required: false},
        loot: {type: String, required: false},
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
