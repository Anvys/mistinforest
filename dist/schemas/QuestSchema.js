"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestModel = void 0;
const mongoose_1 = require("mongoose");
const QuestSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    type: { type: String, default: 'Quest' },
    availableAfter: [{ type: String, default: '' }],
    startAt: { type: String, default: 'auto' },
    endAt: { type: String, default: 'auto' },
    qStages: [{
            num: { type: Number, default: 1 },
            proc: { type: Number, default: 1 },
            stagePosType: { type: String, default: 'pos' },
            stagePos: { type: mongoose_1.Schema.Types.Mixed, required: true },
            name: { type: String, required: true },
            expr: { type: String, default: 'or' },
            type: { type: String, required: true },
            require: { type: Object, required: false },
            timeAvailable: { type: String, default: 'Always' },
            timeSpend: { type: Number, default: 0 },
        }],
    loot: { type: Object, required: false, default: '--No loot--' },
    translate: {
        En: { type: String, default: '' },
        Fr: { type: String, default: '' },
        Ru: { type: String, default: '' },
    },
    notes: [{ type: String }],
});
exports.QuestModel = (0, mongoose_1.model)('Quests', QuestSchema);
