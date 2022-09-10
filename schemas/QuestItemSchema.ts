import {model, Schema} from "mongoose";
import {TTranslateData} from "../utils/types";

export type TQuestItem = {
    name: string
    icon: string
    
    translate: TTranslateData
    notes: Array<string>
}
const QuestItemSchema = new Schema<TQuestItem>({
    name: {type: String, required: true},
    icon: {type:String, default: ''},
    
    translate: {
        En: {type: String, default: ''},
        Fr: {type: String, default: ''},
        Ru: {type: String, default: ''},
    },
    notes: [{type: String}],
})

export const QuestItemModel = model<TQuestItem>('QuestItems', QuestItemSchema)
