"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMW = exports.getResObj = exports.getObjId = exports.updateObjectValue = exports.addRes = exports.isDuplicate = exports.allowDuplicateName = void 0;
const mongoose_1 = require("mongoose");
const statusCodes_1 = require("../utils/statusCodes");
exports.allowDuplicateName = ['QuestItemSources', 'GatherPoints'];
const isDuplicate = (filter, model) => {
    // if(model.name===QuestItemSourceModel || model === GatherPointModel) return []
    if (exports.allowDuplicateName.includes(model.modelName))
        return [];
    return model.find(filter);
};
exports.isDuplicate = isDuplicate;
const addRes = (res, model) => __awaiter(void 0, void 0, void 0, function* () {
    const newComponent = new model(Object.assign({}, res));
    yield newComponent.save();
    return newComponent;
});
exports.addRes = addRes;
const updateObjectValue = (obj, newObj) => {
    for (const [key, value] of Object.entries(obj)) {
        const valueType = typeof value;
        if (valueType === "object")
            obj[key] = (0, exports.updateObjectValue)(obj[key], newObj[key]);
        else {
            if (key !== '_id')
                obj[key] = newObj[key];
        }
    }
    return obj;
};
exports.updateObjectValue = updateObjectValue;
const getObjId = (id) => {
    if (id.length !== 24)
        throw new Error(`in getObjId:: id length must be 24, current:${id} is ${id.length}`);
    return new mongoose_1.Types.ObjectId(id);
};
exports.getObjId = getObjId;
const getResObj = (data, status = statusCodes_1.StatusCodes.Ok, msg = []) => ({ status, msg, data });
exports.getResObj = getResObj;
const validateMW = (req, res, next) => {
    // console.log(`here mw | ${req.params.id} => ${req.params.id && (req.params.id.length !==24) }`)
    if (req.params.id && req.params.id.length !== 24) {
        console.log(`not 24 str: ${req.params.id}`);
        res.json((0, exports.getResObj)([], statusCodes_1.StatusCodes.badId, [`must be string of 24 hex characters`]));
    }
    else
        next();
};
exports.validateMW = validateMW;
