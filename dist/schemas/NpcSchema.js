"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NpcModel = void 0;
const mongoose_1 = require("mongoose");
const NpcSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    location: { type: String, default: '' },
    time: { type: String, default: 'Always' },
    translate: {
        En: { type: String, default: '' },
        Fr: { type: String, default: '' },
        Ru: { type: String, default: '' },
    },
    notes: [{ type: String }],
});
exports.NpcModel = (0, mongoose_1.model)('Npc', NpcSchema);
