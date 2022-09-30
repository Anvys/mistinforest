"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestItemSourceModel = void 0;
const mongoose_1 = require("mongoose");
const QuestItemSourceSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    posQuestItem: {
        type: { type: String, required: true },
        position: { type: Object, required: true },
    },
    translate: {
        En: { type: String, default: '' },
        Fr: { type: String, default: '' },
        Ru: { type: String, default: '' },
    },
    notes: [{ type: String }],
});
exports.QuestItemSourceModel = (0, mongoose_1.model)('QuestItemSources', QuestItemSourceSchema);
