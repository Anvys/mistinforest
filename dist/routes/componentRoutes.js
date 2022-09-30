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
exports.resRoute = void 0;
const express_1 = __importDefault(require("express"));
const statusCodes_1 = require("../utils/statusCodes");
const RoutesUtils_1 = require("./RoutesUtils");
const router = express_1.default.Router();
/**
 *
 * @param model
 * T - resource type  TMaterials, TComponents etc ;
 * U - string res type for request type : 'Component' ;
 */
const resRoute = (model) => {
    router.get('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const findMatRes = yield model.find();
        if (findMatRes.length)
            res.json({
                status: statusCodes_1.StatusCodes.Ok,
                msg: [],
                data: findMatRes
            });
        else
            res.json({ status: statusCodes_1.StatusCodes.notFound, msg: ['Empty bd for this category'], data: [] });
    }));
    router.get('/one', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`GET material for ${req.query.name}`);
        const resObj = {
            status: statusCodes_1.StatusCodes.notFound,
            msg: [`Not found for ${req.query.name}`],
            data: []
        };
        const filter = { name: req.query.name };
        const findRes = yield model.find(filter);
        // console.log(findRes)
        if (findRes.length) {
            resObj.status = statusCodes_1.StatusCodes.Ok;
            resObj.msg = [];
            resObj.data = findRes;
        }
        console.log(resObj);
        res.json(resObj);
    }));
    router.post('/one', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`POST material for ${req.body.resource.name}`);
        const comp = req.body.resource;
        // console.log(ress)
        const findDubRes = yield (0, RoutesUtils_1.isDuplicate)({ name: comp.name }, model);
        // console.log(findDubRes)
        if (findDubRes.length) {
            res.json({
                status: statusCodes_1.StatusCodes.duplicateFound,
                msg: [`Duplicate found for ${findDubRes[0].name}`],
                data: []
            });
        }
        else {
            // console.log('Adding')
            const newRes = yield (0, RoutesUtils_1.addRes)(comp, model); //.then(data => data).catch(err=> console.log(err))
            // console.log(newRes)
            res.json({ status: statusCodes_1.StatusCodes.Ok, msg: [], data: [newRes] });
        }
    }));
    router.put('/one', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`PUT for ${req.body.resource.name}`);
        const filter = { name: req.query.name };
        const findRes = yield model.find(filter);
        console.log(findRes.length);
        if (findRes.length) {
            if (findRes.length > 1)
                res.json({
                    status: statusCodes_1.StatusCodes.multipleFound,
                    msg: [`Cant update if found more then one entity for ${req.query.name}, found ${findRes.length}`],
                    data: findRes
                });
            else {
                const doc = yield model.findOneAndUpdate(filter, req.body.resource, { new: true });
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
    router.delete('/one', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`DEL for ${req.query.name}`);
        const filter = { name: req.query.name };
        const findRes = yield model.findOneAndDelete(filter);
        console.log(`find for delete: ${findRes === null || findRes === void 0 ? void 0 : findRes.name}`);
        const resBody = findRes ? { status: statusCodes_1.StatusCodes.Ok, msg: [], data: [findRes] } : {
            status: statusCodes_1.StatusCodes.notFound,
            msg: [`Not found for ${req.query.name}`],
            data: []
        };
        console.log(resBody.status);
        res.json(resBody);
    }));
    return router;
};
exports.resRoute = resRoute;
// export default router
