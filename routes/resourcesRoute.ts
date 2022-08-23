import express, {Request, Response} from "express";
import * as core from 'express-serve-static-core';
import {TComponents} from "../schemas/components";
import {TMaterials} from "../schemas/materials";
import {Model} from "mongoose";
import {StatusCodes} from "../utils/statusCodes";
import {TRequestBody, TResourceRequestBody, TResponseBody, TResponseSingleBody} from "../utils/types";
import {addRes, isDuplicate} from "./RoutesUtils";


/**
 *
 * @param model
 * T - resource type  TMaterials, TComponents etc ;
 * U - string res type for request type : 'Component' ;
 */
export const resourcesRoute = <T extends TMaterials | TComponents,U>(model: Model<T>) => {
    const router = express.Router();
    // type TResourceReqBody = TResourceRequestBody<T, U>
    // type TResourceResBody = TResponseSingleBody<T>
    type TResourceReq = Request<{} ,{}, TRequestBody<T>>
    type TResourceGetReq = Request<{} ,{}, TRequestBody<T>,{name: string}>
    type TResourceRes = Response<TResponseBody<T>>
    router.get('/all', async (req: TResourceGetReq, res: TResourceRes) => {
        const findMatRes = await model.find();
        if (findMatRes.length) res.json({
            status: StatusCodes.Ok,
            msg: [],
            data: findMatRes
        })
        else res.json({status: StatusCodes.notFound, msg: ['Empty bd for this category'], data: []})
    })
    router.get('/one', async (req: TResourceGetReq, res: TResourceRes) => {
        console.log(`GET material for ${req.query.name}`)
        const resObj: TResponseBody<T> = {
            status: StatusCodes.notFound,
            msg: [`Not found for ${req.query.name}`],
            data: []
        }
        const filter = {name: req.query.name};
        const findRes = await model.findOne(filter);
        console.log(findRes?.name)
        if (findRes) {
            resObj.status = StatusCodes.Ok;
            resObj.msg = [];
            resObj.data = [findRes];
        }
        // console.log(resObj)
        res.json(resObj)
    })
    router.post('/one', async (req: TResourceGetReq, res: TResourceRes) => {
        console.log(`POST material for ${req.body.data.name}`)
        const comp = req.body.data;
        // console.log(ress)
        const findDubRes = await isDuplicate<T>({name: comp.name}, model)
        // console.log(findDubRes)
        if (findDubRes.length) {
            res.json({
                status: StatusCodes.duplicateFound,
                msg: [`Duplicate found for ${findDubRes[0].name}`],
                data: []
            })
        } else {
            // console.log('Adding')
            const newRes = await addRes<T>(comp, model);//.then(data => data).catch(err=> console.log(err))
            // console.log(newRes)
            res.json({status: StatusCodes.Ok, msg: [], data: [newRes]})
        }
    })
    router.put('/one', async (req: TResourceGetReq, res: TResourceRes) => {
        console.log(`PUT for ${req.query.name} replace on ${req.body.data.name}`)
        const filter = {name: req.query.name};
        const findRes = await model.find(filter);
        console.log(`update for ${findRes[0]?.name}, findres length= ${findRes?.length}`)
        if (findRes.length) {
            if (findRes.length > 1)
                res.json({
                    status: StatusCodes.multipleFound,
                    msg: [`Cant update if found more then one entity for ${req.query.name}, found ${findRes.length}`],
                    data: findRes
                })
            else {
                const doc = await model.findOneAndUpdate(filter, req.body.data, {new: true})
                if (!doc) res.json({
                    status: StatusCodes.notFound,
                    msg: [`Cant update if not for ${req.query.name}`],
                    data: []
                })
                else {
                    console.log(`Updated ok : ${doc.name}`)
                    res.json({
                        status: StatusCodes.Ok,
                        msg: [],
                        data: [doc]
                    })
                }
            }
        } else {
            res.json({status: StatusCodes.notFound, msg: [`Not found for ${req.query.name}`], data: []})
        }
    })
    router.delete('/one', async (req: TResourceGetReq, res: TResourceRes) => {
        console.log(`DEL for ${req.query.name}`)
        const filter = {name: req.query.name};
        const findRes = await model.findOneAndDelete(filter);
        // console.log(`find for delete: ${findRes?.name}`)
        const resBody: TResponseBody<T> = findRes ? {status: StatusCodes.Ok, msg: [], data: [findRes]} : {
            status: StatusCodes.notFound,
            msg: [`Not found for ${req.query.name}`],
            data: []
        };
        console.log(`delete result: ${resBody.status}: ${resBody.msg[0]}`)
        res.json(resBody)
    })
    return router
}