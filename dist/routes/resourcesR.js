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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const components_1 = __importDefault(require("../schemas/components"));
const materials_1 = __importDefault(require("../schemas/materials"));
const statusCodes_1 = require("../utils/statusCodes");
const router = express_1.default.Router();
const isDuplicate = (filter, model) => {
    return model.find(filter);
};
const addRes = (res, model) => __awaiter(void 0, void 0, void 0, function* () {
    const newComponent = new model(Object.assign({}, res));
    yield newComponent.save();
    return newComponent;
});
const updateObjectValue = (obj, newObj) => {
    for (const [key, value] of Object.entries(obj)) {
        const valueType = typeof value;
        if (valueType === "object")
            obj[key] = updateObjectValue(obj[key], newObj[key]);
        else {
            if (key !== '_id')
                obj[key] = newObj[key];
        }
    }
    return obj;
};
router.get('/get', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`GET for ${req.query.name}`);
    const filter = { name: req.query.name };
    const findRes = req.query.type === 'Material' ? yield materials_1.default.find(filter) : yield components_1.default.find(filter);
    console.log(findRes);
    const resBody = findRes.length ? { status: statusCodes_1.StatusCodes.Ok, msg: [], data: findRes } : {
        status: statusCodes_1.StatusCodes.notFound,
        msg: [`Not found for ${req.query.name}`],
        data: []
    };
    console.log(resBody);
    res.json(resBody);
}));
router.post('/material', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ress = req.body.resource;
    const findDubRes = yield isDuplicate({ name: ress.name }, materials_1.default);
    if (findDubRes.length)
        res.json({
            status: statusCodes_1.StatusCodes.duplicateFound,
            msg: [`Duplicate found for ${findDubRes[0].name}`],
            data: []
        });
    else {
        const newRes = yield addRes(ress, materials_1.default); //.then(data => data).catch(err=> console.log(err))
        res.json({ status: statusCodes_1.StatusCodes.Ok, msg: [], data: [newRes] });
    }
}));
router.post('/component', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ress = req.body.resource;
    const findDubRes = yield isDuplicate({ name: ress.name }, components_1.default);
    if (findDubRes.length)
        res.json({
            status: statusCodes_1.StatusCodes.duplicateFound,
            msg: [`Duplicate found for ${findDubRes[0].name}`],
            data: []
        });
    else {
        const newRes = yield addRes(ress, components_1.default); //.then(data => data).catch(err=> console.log(err))
        res.json({ status: statusCodes_1.StatusCodes.Ok, msg: [], data: [newRes] });
    }
}));
router.put('/put', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('In UPDATE');
    const filter = { name: req.query.name };
    const findRes = req.query.type === 'Material' ? yield materials_1.default.find(filter) : yield components_1.default.find(filter);
    console.log(findRes.length);
    if (findRes.length) {
        if (findRes.length > 1)
            res.json({
                status: statusCodes_1.StatusCodes.multipleFound,
                msg: [`Cant update if found more then one entity for ${req.query.name}, found ${findRes.length}`],
                data: findRes
            });
        else {
            const doc = req.query.type === 'Material'
                ? yield materials_1.default.findOneAndUpdate(filter, req.body.resource, { new: true })
                : yield components_1.default.findOneAndUpdate(filter, req.body.resource, { new: true });
            if (!doc)
                res.json({
                    status: statusCodes_1.StatusCodes.notFound,
                    msg: [`Cant update if not for ${req.query.name}`],
                    data: []
                });
            else
                res.json({
                    status: statusCodes_1.StatusCodes.Ok,
                    msg: [],
                    data: [doc]
                });
        }
    }
    else {
        res.json({ status: statusCodes_1.StatusCodes.notFound, msg: [`Not found for ${req.query.name}`], data: [] });
    }
}));
router.delete('/del', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`DEL for ${req.query.name}`);
    const filter = { name: req.query.name };
    const findRes = req.query.type === 'Material' ? yield materials_1.default.findOneAndDelete(filter) : yield components_1.default.findOneAndDelete(filter);
    console.log(`find for delete: ${findRes === null || findRes === void 0 ? void 0 : findRes.name}`);
    const resBody = findRes ? { status: statusCodes_1.StatusCodes.Ok, msg: [], data: [findRes] } : {
        status: statusCodes_1.StatusCodes.notFound,
        msg: [`Not found for ${req.query.name}`],
        data: []
    };
    console.log(resBody.status);
    res.json(resBody);
}));
exports.default = router;
