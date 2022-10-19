"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentModel = void 0;
const mongoose_1 = require("mongoose");
const commonSchema_1 = require("./commonSchema");
const ComponentsSchema = new mongoose_1.Schema(Object.assign({ name: { type: String, required: true }, icon: { type: String, default: '' }, type: { type: String, required: true }, durability: { type: Number, required: true }, craftDifficulty: { type: Number, required: true }, gatherDifficulty: { type: Number, default: 0 }, attributes: {
        Activator: { type: Number, default: 0 },
        Binder: { type: Number, default: 0 },
        Deteriorator: { type: Number, default: 0 },
        Energizer: { type: Number, default: 0 },
        Focuser: { type: Number, default: 0 },
        Fortifier: { type: Number, default: 0 },
        Putrefier: { type: Number, default: 0 },
        Stimulator: { type: Number, default: 0 },
        Toner: { type: Number, default: 0 },
        Tranquilizer: { type: Number, default: 0 },
        Elioam: { type: Number, default: 0 },
        Frimam: { type: Number, default: 0 },
        Hydram: { type: Number, default: 0 },
        Lectram: { type: Number, default: 0 },
        Lithram: { type: Number, default: 0 },
        Magnam: { type: Number, default: 0 },
        Psycham: { type: Number, default: 0 },
        Pyram: { type: Number, default: 0 },
        Radiam: { type: Number, default: 0 },
        Stratam: { type: Number, default: 0 },
    }, tier: { type: Number, required: true }, goldCost: { type: Number, default: 0 }, encumbrance: { type: Number, default: 0 } }, commonSchema_1.commonSchemaFields));
exports.ComponentModel = (0, mongoose_1.model)('components', ComponentsSchema);
