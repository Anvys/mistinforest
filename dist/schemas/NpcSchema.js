"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NpcModel = void 0;
const mongoose_1 = require("mongoose");
const commonSchema_1 = require("./commonSchema");
const NpcSchema = new mongoose_1.Schema(Object.assign({ name: { type: String, required: true }, location: { type: String, default: '' }, time: { type: String, default: 'Always' } }, commonSchema_1.commonSchemaFields));
exports.NpcModel = (0, mongoose_1.model)('Npc', NpcSchema);
