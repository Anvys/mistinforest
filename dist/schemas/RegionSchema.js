"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionModel = void 0;
const mongoose_1 = require("mongoose");
const commonSchema_1 = require("./commonSchema");
const RegionSchema = new mongoose_1.Schema(Object.assign({ name: { type: String, required: true }, terrain: { type: String, default: 'Urban' }, terrainReq: { type: Number, default: 0 }, bound: [[{ type: Number, required: false }]], pos: {
        x: { type: Number, default: 0 },
        y: { type: Number, default: 0 },
    } }, commonSchema_1.commonSchemaFields));
exports.RegionModel = (0, mongoose_1.model)('Regions', RegionSchema);
