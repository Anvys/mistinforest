"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainerModel = void 0;
const mongoose_1 = require("mongoose");
const TrainerSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    type: { type: String, default: 'Academic' },
    difficult: { type: Number, default: 1 },
    time: { type: Number, default: 30 },
    cooldown: { type: Number, default: 120 },
    cost: {
        type: { type: String, default: '' },
        name: { type: String, default: '' },
        count: { type: Number, default: 1 },
    },
    reward: {
        type: { type: String, default: '' },
        name: { type: String, default: '' },
        count: { type: Number, default: 1 },
    },
    location: { type: String, required: true },
    translate: {
        En: { type: String, default: '' },
        Fr: { type: String, default: '' },
        Ru: { type: String, default: '' },
    },
    notes: [{ type: String }],
});
exports.TrainerModel = (0, mongoose_1.model)('Trainers', TrainerSchema);
