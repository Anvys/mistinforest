import {model, Schema} from "mongoose";
import {TExpr, TMapPosition, TStageRequire, TTranslateData} from "../utils/types";
import {TLoot} from "./LootSchema";
import {TLocation} from "./LocationSchema";
import {TNpc} from "./NpcSchema";


export type TQuestStage = {
    num: number
    proc: number
    expr: TExpr
    name: string
    type: string
    require: TStageRequire
    timeAvailable: string
    timeSpend: number
    stagePosType: 'pos' | 'npc' | 'location'
    stagePos: TMapPosition | TNpc | TLocation
    loot: string | null
}
export type TQuest = {
    name: string
    type: string
    availableAfter: Array<string>
    stages: Array<TQuestStage>
    translate: TTranslateData
    notes: Array<string>
}
const QuestSchema = new Schema<TQuest>({
    name: {type: String, required: true},
    type: {type: String, default: 'Quest'},
    availableAfter: [{type: String, default: ''}],
    stages: [{
        num: {type: Number, default: 1},
        proc: {type: Number, default: 1},
        stagePosType: {type: String, default: 'pos'},
        stagePos: {type: Schema.Types.Mixed, required: true},
        name: {type: String, required: true},
        expr: {type: String, default: 'or'},
        type: {type: String, required: true},
        require: {type: Object, required: false},
        timeAvailable: {type: String, default: 'Always'},
        timeSpend: {type: Number, default: 0},
        loot: {type: String, required: false},
    }],

    translate: {
        En: {type: String, default: ''},
        Fr: {type: String, default: ''},
        Ru: {type: String, default: ''},
    },
    notes: [{type: String}],
})

export const QuestModel = model<TQuest>('Quests', QuestSchema)
