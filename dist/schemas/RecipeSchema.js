"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeModel = void 0;
const mongoose_1 = require("mongoose");
const RecipeSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    icon: { type: String, default: '' },
    resultType: { type: String, default: 'Crowns' },
    parts: [{
            name: { type: String, required: true },
            component: { type: String, default: '' },
            count: { type: Number, default: 0 },
            type: { type: String, default: 'Alchemy' },
            baseReq: { type: Number, default: 0 },
        }],
    translate: {
        En: { type: String, default: '' },
        Fr: { type: String, default: '' },
        Ru: { type: String, default: '' },
    },
    notes: [{ type: String }],
});
exports.RecipeModel = (0, mongoose_1.model)('Recipes', RecipeSchema);
