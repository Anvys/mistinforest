"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MaterialsSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    durability: { type: Number, required: true },
    difficulty: { type: Number, required: true },
    attributes: {
        Absorbity: { type: Number, default: 0 },
        Density: { type: Number, default: 0 },
        Flexibility: { type: Number, default: 0 },
        Hardness: { type: Number, default: 0 },
        Lightness: { type: Number, default: 0 },
        Purity: { type: Number, default: 0 },
        Radiance: { type: Number, default: 0 },
        Rigidity: { type: Number, default: 0 },
    },
    tier: { type: Number, required: true },
});
exports.default = (0, mongoose_1.model)('materials', MaterialsSchema);
