import express, {Request, Response, Router} from "express";
import {TCombineData, TRequestBody, TResponseBody} from "../utils/types";
import {StatusCodes} from "../utils/statusCodes";
import {getObjId, getResObj, isDuplicate, validateMW} from "./RoutesUtils";
import {Model, Types} from "mongoose";
import {TMaterial} from "../schemas/MaterialSchema";
import {TComponent} from "../schemas/ComponentSchema";
import {TNpc} from "../schemas/NpcSchema";


export const GenRoute = <T extends TCombineData>(model: Model<T>): Router => {
    type TGetOneReq = Request<{ id: string }>;
    type TPostReq = Request<{ id: string }, {}, TRequestBody<T>>;
    type TRes = Response<TResponseBody<T>>;
    const route = express.Router();
    route.get('/getid', validateMW, async (req, res) => {
        const newId = new Types.ObjectId();
        console.log(`Model: ${model.name}// newid: ${newId}`)
        res.json({status: StatusCodes.Ok, msg: [], data: [newId]})
    })
    route.get('/all', async (req, res: TRes) => {
        const queryNpc = await model.find().select('-__v');
        if (queryNpc.length) res.json(getResObj<T>(queryNpc))
        else res.json(getResObj([], StatusCodes.notFound, [`empty bd`]))
    })
    route.get('/one/:id', validateMW, async (req: TGetOneReq, res: TRes) => {
        const id = req.params.id;
        const queryNpc = await model.findById(getObjId(id)).select('-__v');
        if (queryNpc) res.json(getResObj<T>([queryNpc]))
        else res.json(getResObj([], StatusCodes.notFound, [`not found for ${id}`]))

    })
    route.post('/one/:id', validateMW, async (req: TPostReq, res: TRes) => {
        const id = req.params.id;
        const data = req.body.data;
        const findDubRes = await isDuplicate<T>({name: data.name}, model)

        if (findDubRes.length) {
            res.json({
                status: StatusCodes.duplicateFound,
                msg: [`Duplicate found for ${data.name}`],
                data: []
            })
        }else{
            const newData = new model({...data, _id: id});
            await newData.save();
            res.json(getResObj<T>([newData]))
        }
    })
    route.post('/one', async (req: TPostReq, res: TRes) => {
        const id = new Types.ObjectId();
        const data = req.body.data;
        // console.log(req.baseUrl)
        const findDubRes = await isDuplicate<T>({name: data.name}, model)
        if (findDubRes.length && req.baseUrl !== '/api/gatherpoint') {
            res.json({
                status: StatusCodes.duplicateFound,
                msg: [`Duplicate found for ${data.name}`],
                data: []
            })
        }else{
            const newData = new model({...data, _id: id});
            await newData.save();
            res.json(getResObj<T>([newData]))
        }

    })
    route.put('/one/:id', validateMW, async (req: TPostReq, res: TRes) => {
        const id = req.params.id;
        const data = await model.findById(getObjId(id)).select('-__v');
        const newData = req.body.data;
        if (data) {
            Object.entries(newData).forEach((v) => {
                data[v[0] as keyof T] = v[1]
            })
            await data.save();
            res.json(getResObj<T>([data]))
        } else res.json(getResObj([], StatusCodes.notFound, [`not found for ${id}`]))
    })
    route.delete('/one/:id', validateMW, async (req: TGetOneReq, res: TRes) => {
        const id = req.params.id;
        const queryData = await model.findByIdAndDelete(getObjId(id)).select('-__v');
        if (queryData) res.json(getResObj<T>([queryData]))
        else res.json(getResObj([], StatusCodes.notFound, [`not found for ${id}`]))
    })
    route.get('/deleteall', async (req: TGetOneReq, res: TRes) => {
        const queryData = await model.remove({})
        console.log(`Model: ${model.name}// DELETED ALL ${queryData?.length}`)
        res.json(getResObj([], StatusCodes.Ok, [`deleted ALL`]))
    })
    return route;
}