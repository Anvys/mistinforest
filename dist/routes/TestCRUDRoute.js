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
exports.GenRoute = void 0;
const express_1 = __importDefault(require("express"));
const statusCodes_1 = require("../utils/statusCodes");
const RoutesUtils_1 = require("./RoutesUtils");
const mongoose_1 = require("mongoose");
const GenRoute = (model) => {
    const route = express_1.default.Router();
    route.get('/getid', RoutesUtils_1.validateMW, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const newId = new mongoose_1.Types.ObjectId();
        console.log(`Model: ${model.name}// newid: ${newId}`);
        res.json({ status: statusCodes_1.StatusCodes.Ok, msg: [], data: [newId] });
    }));
    route.get('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const queryNpc = yield model.find().select('-__v');
        if (queryNpc.length)
            res.json((0, RoutesUtils_1.getResObj)(queryNpc));
        else
            res.json((0, RoutesUtils_1.getResObj)([], statusCodes_1.StatusCodes.notFound, [`empty bd`]));
    }));
    route.get('/one/:id', RoutesUtils_1.validateMW, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        const queryNpc = yield model.findById((0, RoutesUtils_1.getObjId)(id)).select('-__v');
        if (queryNpc)
            res.json((0, RoutesUtils_1.getResObj)([queryNpc]));
        else
            res.json((0, RoutesUtils_1.getResObj)([], statusCodes_1.StatusCodes.notFound, [`not found for ${id}`]));
    }));
    route.post('/one/:id', RoutesUtils_1.validateMW, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        const data = req.body.data;
        const findDubRes = yield (0, RoutesUtils_1.isDuplicate)({ name: data.name }, model);
        if (findDubRes.length) {
            res.json({
                status: statusCodes_1.StatusCodes.duplicateFound,
                msg: [`Duplicate found for ${data.name}`],
                data: []
            });
        }
        else {
            const newData = new model(Object.assign(Object.assign({}, data), { _id: id }));
            yield newData.save();
            res.json((0, RoutesUtils_1.getResObj)([newData]));
        }
    }));
    route.post('/one', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = new mongoose_1.Types.ObjectId();
        const data = req.body.data;
        // console.log(req.baseUrl)
        const findDubRes = yield (0, RoutesUtils_1.isDuplicate)({ name: data.name }, model);
        if (findDubRes.length && req.baseUrl !== '/api/gatherpoint') {
            res.json({
                status: statusCodes_1.StatusCodes.duplicateFound,
                msg: [`Duplicate found for ${data.name}`],
                data: []
            });
        }
        else {
            const newData = new model(Object.assign(Object.assign({}, data), { _id: id }));
            yield newData.save();
            res.json((0, RoutesUtils_1.getResObj)([newData]));
        }
    }));
    route.put('/one/:id', RoutesUtils_1.validateMW, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        const data = yield model.findById((0, RoutesUtils_1.getObjId)(id)).select('-__v');
        const newData = req.body.data;
        if (data) {
            Object.entries(newData).forEach((v) => {
                data[v[0]] = v[1];
            });
            yield data.save();
            res.json((0, RoutesUtils_1.getResObj)([data]));
        }
        else
            res.json((0, RoutesUtils_1.getResObj)([], statusCodes_1.StatusCodes.notFound, [`not found for ${id}`]));
    }));
    route.delete('/one/:id', RoutesUtils_1.validateMW, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        const queryData = yield model.findByIdAndDelete((0, RoutesUtils_1.getObjId)(id)).select('-__v');
        if (queryData)
            res.json((0, RoutesUtils_1.getResObj)([queryData]));
        else
            res.json((0, RoutesUtils_1.getResObj)([], statusCodes_1.StatusCodes.notFound, [`not found for ${id}`]));
    }));
    route.get('/deleteall', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const queryData = yield model.remove({});
        console.log(`Model: ${model.name}// DELETED ALL ${queryData === null || queryData === void 0 ? void 0 : queryData.length}`);
        res.json((0, RoutesUtils_1.getResObj)([], statusCodes_1.StatusCodes.Ok, [`deleted ALL`]));
    }));
    return route;
};
exports.GenRoute = GenRoute;
