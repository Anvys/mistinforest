"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaminaElixirModel = void 0;
const mongoose_1 = require("mongoose");
const StaminaElixirSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    icon: { type: String, default: '' },
    pos: {
        x: { type: Number, default: 0 },
        y: { type: Number, default: 0 },
    },
    translate: {
        En: { type: String, default: '' },
        Fr: { type: String, default: '' },
        Ru: { type: String, default: '' },
    },
    notes: [{ type: String }],
});
exports.StaminaElixirModel = (0, mongoose_1.model)('StaminaElixir', StaminaElixirSchema);
