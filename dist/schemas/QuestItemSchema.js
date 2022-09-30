"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestItemModel = void 0;
const mongoose_1 = require("mongoose");
const QuestItemSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    icon: { type: String, default: '' },
    translate: {
        En: { type: String, default: '' },
        Fr: { type: String, default: '' },
        Ru: { type: String, default: '' },
    },
    notes: [{ type: String }],
});
exports.QuestItemModel = (0, mongoose_1.model)('QuestItems', QuestItemSchema);
