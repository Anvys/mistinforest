import {model, Schema} from "mongoose";
import {commonSchemaFields, TCommonFields} from "./commonSchema";

export type TQuestItem = TCommonFields & {
    icon: string
}
const QuestItemSchema = new Schema<TQuestItem>({
    name: {type: String, required: true},
    icon: {type: String, default: ''},
    ...commonSchemaFields
})

export const QuestItemModel = model<TQuestItem>('QuestItems', QuestItemSchema)
