"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// export interface IComponents {
//     name: string
//     type: TComponentType
//     durability: number
//     difficulty: number
//     tier: number
//     attributes: TComponentAttributes
// }
const ComponentsSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    durability: { type: Number, required: true },
    difficulty: { type: Number, required: true },
    attributes: {
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
        Stratam: { type: Number, default: 0 },
    },
    tier: { type: Number, required: true },
});
exports.default = (0, mongoose_1.model)('components', ComponentsSchema);
