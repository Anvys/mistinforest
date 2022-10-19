"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventModel = void 0;
const mongoose_1 = require("mongoose");
const commonSchema_1 = require("./commonSchema");
const EventSchema = new mongoose_1.Schema(Object.assign({ name: { type: String, required: true }, type: { type: String, default: 'BlueFlag' }, region: { type: String, required: true }, icon: { type: String, default: '' }, eStages: [{
            num: { type: Number, default: 1 },
            proc: { type: Number, default: 1 },
            name: { type: String, required: true },
            expr: { type: String, default: 'or' },
            type: { type: String, required: true },
            require: { type: Object, required: false },
            time: { type: Number, default: 0 },
        }], loot: { type: Object, default: null }, pos: {
        x: { type: Number, default: 0 },
        y: { type: Number, default: 0 },
    } }, commonSchema_1.commonSchemaFields));
exports.EventModel = (0, mongoose_1.model)('Events', EventSchema);
