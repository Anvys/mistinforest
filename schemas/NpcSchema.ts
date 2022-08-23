import {model, Schema} from "mongoose";
import {TTranslateData} from "../utils/types";

export type TNpc = {
    name: string
    location: string
    time: string
    translate: TTranslateData
}
const NpcSchema = new Schema<TNpc>({
    name: {type: String, required: true},
    location: {type:String, default: ''},
    time: {type: String, default: 'Always'},
    translate: {
        En: {type: String, default: ''},
        Fr: {type: String, default: ''},
        Ru: {type: String, default: ''},
    },
})

export const NpcModel = model<TNpc>('Npc', NpcSchema)
