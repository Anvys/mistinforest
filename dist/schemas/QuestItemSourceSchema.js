"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestItemSourceModel = void 0;
const mongoose_1 = require("mongoose");
const commonSchema_1 = require("./commonSchema");
const QuestItemSourceSchema = new mongoose_1.Schema(Object.assign({ name: { type: String, required: true }, posQuestItem: {
        type: { type: String, required: true },
        position: { type: Object, required: true },
    } }, commonSchema_1.commonSchemaFields));
exports.QuestItemSourceModel = (0, mongoose_1.model)('QuestItemSources', QuestItemSourceSchema);
