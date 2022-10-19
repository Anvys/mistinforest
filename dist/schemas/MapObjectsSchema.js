"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapObjectModel = void 0;
const mongoose_1 = require("mongoose");
const commonSchema_1 = require("./commonSchema");
const MapObjectSchema = new mongoose_1.Schema(Object.assign({ name: { type: String, required: true }, icon: { type: String, default: '' }, pos: {
        x: { type: Number, default: 0 },
        y: { type: Number, default: 0 },
    } }, commonSchema_1.commonSchemaFields));
exports.MapObjectModel = (0, mongoose_1.model)('MapObjects', MapObjectSchema);
