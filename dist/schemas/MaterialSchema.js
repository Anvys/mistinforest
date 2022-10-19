"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialModel = void 0;
const mongoose_1 = require("mongoose");
const commonSchema_1 = require("./commonSchema");
//
/** Resources interface
 * T: resource type Type (TMaterialType | TComponentType)
 * U: attributes Type (TMaterialAttributes | TComponentAttributes)
 */
const MaterialsSchema = new mongoose_1.Schema(Object.assign({ name: { type: String, required: true }, icon: { type: String, default: '' }, type: { type: String, required: true }, durability: { type: Number, required: true }, craftDifficulty: { type: Number, required: true }, gatherDifficulty: { type: Number, required: true }, attributes: {
        Absorbity: { type: Number, default: 0 },
        Density: { type: Number, default: 0 },
        Flexibility: { type: Number, default: 0 },
        Hardness: { type: Number, default: 0 },
        Lightness: { type: Number, default: 0 },
        Purity: { type: Number, default: 0 },
        Radiance: { type: Number, default: 0 },
        Rigidity: { type: Number, default: 0 },
    }, tier: { type: Number, required: true }, goldCost: { type: Number, default: 0 }, encumbrance: { type: Number, default: 0 } }, commonSchema_1.commonSchemaFields));
exports.MaterialModel = (0, mongoose_1.model)('materials', MaterialsSchema);
