"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopModel = void 0;
const mongoose_1 = require("mongoose");
const ShopSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    npc: { type: String, required: true },
    content: [{
            type: { type: String, required: true },
            item: { type: Object, required: true },
            count: { type: Number, default: -1 },
            price: { type: Number, required: true },
            reputationRequire: {
                reputation: { type: String, required: false },
                count: { type: Number, default: 0 },
            }
        }],
    icon: { type: String, required: true },
    translate: {
        En: { type: String, default: '' },
        Fr: { type: String, default: '' },
        Ru: { type: String, default: '' },
    },
    notes: [{ type: String }],
});
exports.ShopModel = (0, mongoose_1.model)('Shop', ShopSchema);
