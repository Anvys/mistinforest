"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslateModel = void 0;
const mongoose_1 = require("mongoose");
const TranslateSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    translate: [{ type: mongoose_1.Schema.Types.Mixed, required: true }],
});
exports.TranslateModel = (0, mongoose_1.model)('translate', TranslateSchema);
