"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatherPointModel = void 0;
const mongoose_1 = require("mongoose");
const commonSchema_1 = require("./commonSchema");
const GatherPointSchema = new mongoose_1.Schema(Object.assign({ name: { type: String, required: true }, icon: { type: String, default: '' }, type: { type: String, required: true }, count: { type: Number, required: true }, loot: { type: Object, required: true }, cooldown: { type: Number, required: true }, pos: {
        x: { type: Number, default: 0 },
        y: { type: Number, default: 0 },
    }, region: { type: String, required: true } }, commonSchema_1.commonSchemaFields));
exports.GatherPointModel = (0, mongoose_1.model)('GatherPoints', GatherPointSchema);
