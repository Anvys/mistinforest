"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopModel = void 0;
const mongoose_1 = require("mongoose");
const commonSchema_1 = require("./commonSchema");
const ShopSchema = new mongoose_1.Schema(Object.assign({ name: { type: String, required: true }, npc: { type: String, required: true }, content: [{
            type: { type: String, required: true },
            item: { type: Object, required: true },
            count: { type: Number, default: -1 },
            price: { type: Number, required: true },
            reputationRequire: {
                reputation: { type: String, required: false },
                count: { type: Number, default: 0 },
            }
        }], icon: { type: String, required: true } }, commonSchema_1.commonSchemaFields));
exports.ShopModel = (0, mongoose_1.model)('Shop', ShopSchema);
