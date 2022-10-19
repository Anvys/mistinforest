"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonsterModel = void 0;
const mongoose_1 = require("mongoose");
const commonSchema_1 = require("./commonSchema");
const MonsterSchema = new mongoose_1.Schema(Object.assign({ name: { type: String, required: true }, type: { type: String, default: 'Monster' }, level: { type: Number, required: true }, life: { type: Number, required: true }, stamina: { type: Number, required: true }, attack: { type: Number, required: true }, armor: { type: Number, required: true }, abilities: [{ type: Object, required: false }], loot: { type: Object, default: null }, region: { type: String, required: true }, icon: { type: String, default: '' } }, commonSchema_1.commonSchemaFields));
exports.MonsterModel = (0, mongoose_1.model)('Monsters', MonsterSchema);
