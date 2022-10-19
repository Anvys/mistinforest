"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestItemModel = void 0;
const mongoose_1 = require("mongoose");
const commonSchema_1 = require("./commonSchema");
const QuestItemSchema = new mongoose_1.Schema(Object.assign({ name: { type: String, required: true }, icon: { type: String, default: '' } }, commonSchema_1.commonSchemaFields));
exports.QuestItemModel = (0, mongoose_1.model)('QuestItems', QuestItemSchema);
