"use strict";
// import express, {Request, Response, Router} from "express";
// import {NpcModel, TNpc} from "../schemas/NpcSchema";
// import {TRequestBody, TResponseBody} from "../utils/types";
// import {StatusCodes} from "../utils/statusCodes";
// import {getObjId, getResObj, validateMW} from "./RoutesUtils";
// import {Types} from "mongoose";
//
// export type TNpcGetOneReq = Request<{ id: string }>;
// export type TNpcPostReq = Request<{ id: string }, {}, TRequestBody<TNpc>>;
// export type TNpcRes = Response<TResponseBody<TNpc>>;
//
// export const NpcRoute = (): Router => {
//     const route = express.Router();
//
//     route.get('/getid',validateMW, async (req, res) => {
//         const newId = new Types.ObjectId();
//         console.log(`newid: ${newId}`)
//         res.json({status: StatusCodes.Ok, msg: [], data: [newId]})
//     })
//     route.get('/all', async (req, res: TNpcRes) => {
//         const queryNpc = await NpcModel.find();
//         if (queryNpc.length) res.json(getResObj<TNpc>(queryNpc))
//         else res.json(getResObj([], StatusCodes.notFound, [`empty bd`]))
//     })
//     route.get('/one/:id', validateMW,async (req: TNpcGetOneReq, res: TNpcRes) => {
//         const id = req.params.id;
//         const queryNpc = await NpcModel.findById(getObjId(id));
//         if (queryNpc) res.json(getResObj<TNpc>([queryNpc]))
//         else res.json(getResObj([], StatusCodes.notFound, [`not found for ${id}`]))
//
//     })
//     route.post('/one/:id', validateMW,async (req: TNpcPostReq, res: TNpcRes) => {
//         const id = req.params.id;
//         const npc = req.body.data;
//         const newNpc = new NpcModel({...npc, _id: id});
//         await newNpc.save();
//         res.json(getResObj<TNpc>([newNpc]))
//     })
//     route.post('/one', async (req: TNpcPostReq, res: TNpcRes) => {
//         const id = new Types.ObjectId();
//         const npc = req.body.data;
//         const newNpc = new NpcModel({...npc, _id: id});
//         await newNpc.save();
//         res.json(getResObj<TNpc>([newNpc]))
//     })
//     route.put('/one/:id', validateMW,async (req: TNpcPostReq, res: TNpcRes) => {
//         const id = req.params.id;
//         const newNpc = req.body.data;
//         const npc = await NpcModel.findById(getObjId(id));
//         if (npc) {
//             Object.entries(newNpc).forEach((v) => {
//                 npc[v[0] as keyof TNpc] = v[1]
//             })
//             await npc.save();
//             res.json(getResObj<TNpc>([npc]))
//         } else res.json(getResObj([], StatusCodes.notFound, [`not found for ${id}`]))
//     })
//     route.delete('/one/:id',validateMW, async (req: TNpcGetOneReq, res: TNpcRes) => {
//         const id = req.params.id;
//         const queryNpc = await NpcModel.findByIdAndDelete(getObjId(id));
//         if (queryNpc) res.json(getResObj<TNpc>([queryNpc]))
//         else res.json(getResObj([], StatusCodes.notFound, [`not found for ${id}`]))
//     })
//     route.get('/deleteall', async (req: TNpcGetOneReq, res: TNpcRes) => {
//         const queryNpc = await NpcModel.remove({})
//         console.log(`DELETED ALL ${queryNpc?.length}`)
//         res.json(getResObj([], StatusCodes.Ok, [`deleted ALL`]))
//     })
//     return route;
// }
