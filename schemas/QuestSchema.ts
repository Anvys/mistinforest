import {model, Schema} from "mongoose";
import {TExpr, TMapPosition, TStageRequire, TTranslateData} from "../utils/types";
import {TLoot} from "./LootSchema";
import {TLocation} from "./LocationSchema";
import {TNpc} from "./NpcSchema";
import {commonSchemaFields, TCommonFields} from "./commonSchema";


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
    // loot: string | null
}
export type TQuest = TCommonFields & {
    type: string
    availableAfter: Array<string>
    startAt: string | 'auto'
    endAt: string | 'auto'
    qStages: Array<TQuestStage>
    loot: string | null
}
const QuestSchema = new Schema<TQuest>({
    name: {type: String, required: true},
    type: {type: String, default: 'Quest'},
    availableAfter: [{type: String, default: ''}],
    startAt: {type: String, default: 'auto'},
    endAt: {type: String, default: 'auto'},
    qStages: [{
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

    }],
    loot: {type: Object, required: false, default:'--No loot--'},
    ...commonSchemaFields
})

export const QuestModel = model<TQuest>('Quests', QuestSchema)
