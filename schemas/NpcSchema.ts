import {model, Schema} from "mongoose";
import {TTranslateData} from "../utils/types";
import {commonSchemaFields, TCommonFields} from "./commonSchema";

export type TNpc = TCommonFields & {
    location: string
    time: string
}
const NpcSchema = new Schema<TNpc>({
    name: {type: String, required: true},
    location: {type:String, default: ''},
    time: {type: String, default: 'Always'},
    ...commonSchemaFields
})

export const NpcModel = model<TNpc>('Npc', NpcSchema)
