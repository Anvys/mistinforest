import {model, Schema} from "mongoose";
import {TQuestItemPosition, TTranslateData} from "../utils/types";

export type TQuestItemSource = {
    _id: string
    name: string
    posQuestItem: TQuestItemPosition

    translate: TTranslateData
    notes: Array<string>
}
const QuestItemSourceSchema = new Schema<TQuestItemSource>({
    name: {type: String, required: true},
    posQuestItem: {
        type: {type: String, required: true},
        position: {type: Object, required: true},
    },
    translate: {
        En: {type: String, default: ''},
        Fr: {type: String, default: ''},
        Ru: {type: String, default: ''},
    },
    notes: [{type: String}],
})

export const QuestItemSourceModel = model<TQuestItemSource>('QuestItemSources', QuestItemSourceSchema)
