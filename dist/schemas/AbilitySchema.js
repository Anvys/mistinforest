"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbilityModel = void 0;
const mongoose_1 = require("mongoose");
const commonSchema_1 = require("./commonSchema");
const AbilitySchema = new mongoose_1.Schema(Object.assign({ name: { type: String, required: true }, type: { type: String, default: 'Passive' }, level: { type: Number, required: true }, stamina: { type: Number, required: true }, cd: { type: Number, default: 0 }, effect: { type: String, required: true }, icon: { type: String, default: '' } }, commonSchema_1.commonSchemaFields));
exports.AbilityModel = (0, mongoose_1.model)('Ability', AbilitySchema);
