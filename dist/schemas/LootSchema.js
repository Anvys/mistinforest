"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LootModel = void 0;
const mongoose_1 = require("mongoose");
const LootSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    loot: [{
            type: { type: String, required: true },
            name: { type: String, required: true },
            countMin: { type: Number, required: true },
            countMax: { type: Number, required: true },
            chance: { type: Number, default: 100 },
        }],
    translate: {
        En: { type: String, default: '' },
        Fr: { type: String, default: '' },
        Ru: { type: String, default: '' },
    },
    notes: [{ type: String }],
});
exports.LootModel = (0, mongoose_1.model)('Loot', LootSchema);
