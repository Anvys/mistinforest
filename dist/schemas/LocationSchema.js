"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationModel = void 0;
const mongoose_1 = require("mongoose");
const commonSchema_1 = require("./commonSchema");
const LocationSchema = new mongoose_1.Schema(Object.assign({ name: { type: String, required: true }, exploreReq: { type: Number, default: 0 }, quest: { type: String, default: '' }, pos: {
        x: { type: Number, default: 0 },
        y: { type: Number, default: 0 },
    }, icon: { type: String, default: '' }, region: { type: String }, moveTo: { type: String, default: '' } }, commonSchema_1.commonSchemaFields));
exports.LocationModel = (0, mongoose_1.model)('Locations', LocationSchema);
