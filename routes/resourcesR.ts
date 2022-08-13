import express, {Request} from "express";
import * as core from 'express-serve-static-core';
import ComponentsModel, {TComponents} from "../schemas/components";
import MaterialModel, {TMaterials} from "../schemas/materials";
import {Model} from "mongoose";
import {StatusCodes} from "../utils/statusCodes";

const router = express.Router();

export type TRequestBody = {
    type: 'Component' | 'Material'
    resource: TMaterials | TComponents
}
export type TResponseBody = {
    status: number
    msg: Array<string>
    data: Array<TComponents | TMaterials>
}
const isDuplicate = <T>(filter: { name: string }, model: Model<T>) => {
    return model.find(filter);
}
const addRes = async <T>(res: T, model: Model<T>) => {
    const newComponent = new model({...res})
    await newComponent.save()
    return newComponent
}
const updateObjectValue = (obj: any, newObj: any): any => {
    for (const [key, value] of Object.entries(obj)) {
        const valueType = typeof value;
        if (valueType === "object") obj[key] = updateObjectValue(obj[key], newObj[key])
        else {
            if (key !== '_id') obj[key] = newObj[key]
        }
    }
    return obj;
}

router.get('/get', async (req: Request<core.ParamsDictionary, TResponseBody, TRequestBody>, res) => {
    console.log(`GET for ${req.query.name}`)
    const filter = {name: req.query.name};
    const findRes = req.query.type === 'Material' ? await MaterialModel.find(filter) : await ComponentsModel.find(filter);
    console.log(findRes)
    const resBody = findRes.length ? {status: StatusCodes.Ok, msg: [], data: findRes} : {
        status: StatusCodes.notFound,
        msg: [`Not found for ${req.query.name}`],
        data: []
    };
    console.log(resBody)
    res.json(resBody)
})
router.post('/material', async (req: Request<core.ParamsDictionary, TResponseBody, TRequestBody>, res) => {
    const ress = req.body.resource as TMaterials;
    const findDubRes = await isDuplicate<TMaterials>({name: ress.name}, MaterialModel)
    if (findDubRes.length) res.json({
        status: StatusCodes.duplicateFound,
        msg: [`Duplicate found for ${findDubRes[0].name}`],
        data: []
    })
    else {
        const newRes = await addRes<TMaterials>(ress, MaterialModel);//.then(data => data).catch(err=> console.log(err))
        res.json({status: StatusCodes.Ok, msg: [], data: [newRes]})
    }
})
router.post('/component', async (req: Request<core.ParamsDictionary, TResponseBody, TRequestBody>, res) => {
    const ress = req.body.resource as TComponents;
    const findDubRes = await isDuplicate<TComponents>({name: ress.name}, ComponentsModel)
    if (findDubRes.length) res.json({
        status: StatusCodes.duplicateFound,
        msg: [`Duplicate found for ${findDubRes[0].name}`],
        data: []
    })
    else {
        const newRes = await addRes<TComponents>(ress, ComponentsModel);//.then(data => data).catch(err=> console.log(err))
        res.json({status: StatusCodes.Ok, msg: [], data: [newRes]})
    }
})


router.put('/put', async (req: Request<core.ParamsDictionary, TResponseBody, TRequestBody>, res) => {
    console.log('In UPDATE')
    const filter = {name: req.query.name};
    const findRes = req.query.type === 'Material' ? await MaterialModel.find(filter) : await ComponentsModel.find(filter);
    console.log(findRes.length)
    if (findRes.length) {
        if (findRes.length > 1)
            res.json({
                status: StatusCodes.multipleFound,
                msg: [`Cant update if found more then one entity for ${req.query.name}, found ${findRes.length}`],
                data: findRes
            })
        else {
            const doc = req.query.type === 'Material'
                ? await MaterialModel.findOneAndUpdate(filter, req.body.resource, {new: true})
                : await ComponentsModel.findOneAndUpdate(filter, req.body.resource, {new: true});
            if (!doc) res.json({
                status: StatusCodes.notFound,
                msg: [`Cant update if not for ${req.query.name}`],
                data: []
            })
            else res.json({
                status: StatusCodes.Ok,
                msg: [],
                data: [doc]
            })
        }
    } else {
        res.json({status: StatusCodes.notFound, msg: [`Not found for ${req.query.name}`], data: []})
    }
})
router.delete('/del', async (req, res) => {
    console.log(`DEL for ${req.query.name}`)
    const filter = {name: req.query.name};
    const findRes = req.query.type === 'Material' ? await MaterialModel.findOneAndDelete(filter) : await ComponentsModel.findOneAndDelete(filter);
    console.log(`find for delete: ${findRes?.name}`)
    const resBody = findRes ? {status: StatusCodes.Ok, msg: [], data: [findRes]} : {
        status: StatusCodes.notFound,
        msg: [`Not found for ${req.query.name}`],
        data: []
    };
    console.log(resBody.status)
    res.json(resBody)
})

export default router