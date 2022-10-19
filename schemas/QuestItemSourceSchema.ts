import {model, Schema} from "mongoose";
import {TQuestItemPosition} from "../utils/types";
import {commonSchemaFields, TCommonFields} from "./commonSchema";

export type TQuestItemSource = TCommonFields & {
    posQuestItem: TQuestItemPosition
}

const QuestItemSourceSchema = new Schema<TQuestItemSource>({
    name: {type: String, required: true},
    posQuestItem: {
        type: {type: String, required: true},
        position: {type: Object, required: true},
    },
    ...commonSchemaFields
})

export const QuestItemSourceModel = model<TQuestItemSource>('QuestItemSources', QuestItemSourceSchema)
