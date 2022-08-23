import {Model, Types} from "mongoose";
import {NextFunction, Request, Response} from "express";
import {TResponseBody} from "../utils/types";
import {StatusCodes} from "../utils/statusCodes";

export const isDuplicate = <T>(filter: { name: string }, model: Model<T>) => {
    return model.find(filter);
}
export const addRes = async <T>(res: T, model: Model<T>) => {
    const newComponent = new model({...res})
    await newComponent.save()
    return newComponent
}
export const updateObjectValue = (obj: any, newObj: any): any => {
    for (const [key, value] of Object.entries(obj)) {
        const valueType = typeof value;
        if (valueType === "object") obj[key] = updateObjectValue(obj[key], newObj[key])
        else {
            if (key !== '_id') obj[key] = newObj[key]
        }
    }
    return obj;
}
export const getObjId = (id: string) => {
    if(id.length!==24) throw new Error(`in getObjId:: id length must be 24, current:${id} is ${id.length}`)
    return new Types.ObjectId(id)
}
export const getResObj = <T>(data: Array<T>, status: number = StatusCodes.Ok, msg: Array<string> = []): TResponseBody<T> =>
    ({status, msg, data})
export const validateMW = (req: Request,res: Response, next: NextFunction) => {
    // console.log(`here mw | ${req.params.id} => ${req.params.id && (req.params.id.length !==24) }`)
    if(req.params.id && req.params.id.length !==24 )res.json(getResObj([], StatusCodes.badId, [`must be string of 24 hex characters`]))
    else next()
}
