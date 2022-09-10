import {ErrorRequestHandler} from "express";
import {StatusCodes} from "../utils/statusCodes";


export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log(`Error Handler`)
    console.log(err)
    const statusCode = res.statusCode ? res.statusCode : 500

    res.status(statusCode)

    res.json({
        status: StatusCodes.unknownError,
        msg: [err.message, process.env.NODE_ENV === 'production' ? null : err.stack],
        data: req.user
    })
}