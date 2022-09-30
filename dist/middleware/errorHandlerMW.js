"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const statusCodes_1 = require("../utils/statusCodes");
const errorHandler = (err, req, res, next) => {
    console.log(`Error Handler`);
    console.log(err);
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        status: statusCodes_1.StatusCodes.unknownError,
        msg: [err.message, process.env.NODE_ENV === 'production' ? null : err.stack],
        data: req.user
    });
};
exports.errorHandler = errorHandler;
