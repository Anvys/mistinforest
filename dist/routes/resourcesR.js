"use strict";
// import express, {Request} from "express";
// import * as core from 'express-serve-static-core';
// import ComponentsModel, {TComponents} from "../schemas/components";
// import MaterialModel, {TMaterials} from "../schemas/materials";
// import {Model} from "mongoose";
// import {StatusCodes} from "../utils/statusCodes";
//
// const router = express.Router();
//
//
// router.get('/resources', async (req: Request<core.ParamsDictionary, TResponseAllBody, TRequestBody>, res) => {
//     const findMatRes = await MaterialModel.find();
//     const findComRes = await ComponentsModel.find();
//     if (findComRes.length || findMatRes.length) res.json({
//         status: StatusCodes.Ok,
//         msg: [],
//         data: {materials: findMatRes, components:findComRes}
//     })
//     else res.json({status: StatusCodes.notFound, msg: ['Empty bd for this category'], data: {materials: [], components: []}})
// })
// router.get('/materials', async (req: Request<core.ParamsDictionary, TResponseSingleBody<TMaterials>, TRequestBody>, res) => {
//     const findMatRes = await MaterialModel.find();
//     if (findMatRes.length) res.json({
//         status: StatusCodes.Ok,
//         msg: [],
//         data: findMatRes
//     })
//     else res.json({status: StatusCodes.notFound, msg: ['Empty bd for this category'], data: []})
// })
// router.get('/components', async (req: Request<core.ParamsDictionary, TResponseSingleBody<TComponents>, TRequestBody>, res) => {
//     const findComRes = await ComponentsModel.find();
//     if (findComRes.length) res.json({
//         status: StatusCodes.Ok,
//         msg: [],
//         data: findComRes
//     })
//     else res.json({status: StatusCodes.notFound, msg: ['Empty bd for this category'], data: []})
// })
//
//
// router.get('/material', async (req: Request<core.ParamsDictionary, TResponseSingleBody, TRequestBody>, res) => {
//     console.log(`GET for ${req.query.name}`)
//     const filter = {name: req.query.name};
//     const findRes = req.query.type === 'Material' ? await MaterialModel.find(filter) : await ComponentsModel.find(filter);
//     console.log(findRes)
//     const resBody = findRes.length ? {status: StatusCodes.Ok, msg: [], data: findRes} : {
//         status: StatusCodes.notFound,
//         msg: [`Not found for ${req.query.name}`],
//         data: []
//     };
//     console.log(resBody)
//     res.json(resBody)
// })
// router.post('/material', async (req: Request<core.ParamsDictionary, TResponseSingleBody, TRequestBody>, res) => {
//     console.log('POST')
//     const ress = req.body.resource as TMaterials;
//     // console.log(ress)
//     const findDubRes = await isDuplicate<TMaterials>({name: ress.name}, MaterialModel)
//     // console.log(findDubRes)
//     if (findDubRes.length) {
//         res.json({
//             status: StatusCodes.duplicateFound,
//             msg: [`Duplicate found for ${findDubRes[0].name}`],
//             data: []
//         })
//     } else {
//         // console.log('Adding')
//         const newRes = await addRes<TMaterials>(ress, MaterialModel);//.then(data => data).catch(err=> console.log(err))
//         // console.log(newRes)
//         res.json({status: StatusCodes.Ok, msg: [], data: [newRes]})
//     }
// })
// router.post('/component', async (req: Request<core.ParamsDictionary, TResponseSingleBody, TRequestBody>, res) => {
//     const ress = req.body.resource as TComponents;
//     const findDubRes = await isDuplicate<TComponents>({name: ress.name}, ComponentsModel)
//     if (findDubRes.length) res.json({
//         status: StatusCodes.duplicateFound,
//         msg: [`Duplicate found for ${findDubRes[0].name}`],
//         data: []
//     })
//     else {
//         const newRes = await addRes<TComponents>(ress, ComponentsModel);//.then(data => data).catch(err=> console.log(err))
//         res.json({status: StatusCodes.Ok, msg: [], data: [newRes]})
//     }
// })
// router.put('/material', async (req: Request<core.ParamsDictionary, TResponseSingleBody, TRequestBody>, res) => {
//     console.log('In UPDATE')
//     const filter = {name: req.query.name};
//     const findRes = req.query.type === 'Material' ? await MaterialModel.find(filter) : await ComponentsModel.find(filter);
//     console.log(findRes.length)
//     if (findRes.length) {
//         if (findRes.length > 1)
//             res.json({
//                 status: StatusCodes.multipleFound,
//                 msg: [`Cant update if found more then one entity for ${req.query.name}, found ${findRes.length}`],
//                 data: findRes
//             })
//         else {
//             const doc = req.query.type === 'Material'
//                 ? await MaterialModel.findOneAndUpdate(filter, req.body.resource, {new: true})
//                 : await ComponentsModel.findOneAndUpdate(filter, req.body.resource, {new: true});
//             if (!doc) res.json({
//                 status: StatusCodes.notFound,
//                 msg: [`Cant update if not for ${req.query.name}`],
//                 data: []
//             })
//             else res.json({
//                 status: StatusCodes.Ok,
//                 msg: [],
//                 data: [doc]
//             })
//         }
//     } else {
//         res.json({status: StatusCodes.notFound, msg: [`Not found for ${req.query.name}`], data: []})
//     }
// })
// router.delete('/material', async (req, res) => {
//     console.log(`DEL for ${req.query.name}`)
//     const filter = {name: req.query.name};
//     const findRes = req.query.type === 'Material' ? await MaterialModel.findOneAndDelete(filter) : await ComponentsModel.findOneAndDelete(filter);
//     console.log(`find for delete: ${findRes?.name}`)
//     const resBody = findRes ? {status: StatusCodes.Ok, msg: [], data: [findRes]} : {
//         status: StatusCodes.notFound,
//         msg: [`Not found for ${req.query.name}`],
//         data: []
//     };
//     console.log(resBody.status)
//     res.json(resBody)
// })
//
// export default router
