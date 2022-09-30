"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationModel = void 0;
const mongoose_1 = require("mongoose");
const LocationSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    exploreReq: { type: Number, default: 0 },
    quest: { type: String, default: '' },
    pos: {
        x: { type: Number, default: 0 },
        y: { type: Number, default: 0 },
    },
    icon: { type: String, default: '' },
    region: { type: String },
    moveTo: { type: String, default: '' },
    translate: {
        En: { type: String, default: '' },
        Fr: { type: String, default: '' },
        Ru: { type: String, default: '' },
    },
    notes: [{ type: String }],
});
exports.LocationModel = (0, mongoose_1.model)('Locations', LocationSchema);
