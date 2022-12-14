"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanionModel = void 0;
const mongoose_1 = require("mongoose");
const commonSchema_1 = require("./commonSchema");
const CompanionSchema = new mongoose_1.Schema(Object.assign({ name: { type: String, required: true }, type: { type: String, required: true }, evoType: { type: String, required: true }, isBattle: { type: Boolean, default: false }, levelMax: { type: Number, required: true }, lifeMax: { type: Number, required: true }, staminaMax: { type: Number, required: true }, armorMax: { type: Number, required: true }, location: { type: String, default: '' }, evoQuests: [{ type: String, default: '' }], weapon: { type: String, required: true }, icon: { type: String, default: '' }, weaponMaxSkill: { type: Number, required: true }, comfort: { type: Number, required: true }, skills: [{
            skill: { type: String, required: true },
            count: { type: Number, required: true },
        }], abilities: [{ type: Object, required: false }] }, commonSchema_1.commonSchemaFields));
exports.CompanionModel = (0, mongoose_1.model)('Companions', CompanionSchema);
