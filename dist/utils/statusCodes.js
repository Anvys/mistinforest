"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusCodes = void 0;
var StatusCodes;
(function (StatusCodes) {
    StatusCodes[StatusCodes["Ok"] = 200] = "Ok";
    StatusCodes[StatusCodes["Created"] = 201] = "Created";
    StatusCodes[StatusCodes["Accepted"] = 202] = "Accepted";
    StatusCodes[StatusCodes["LoginSuccess"] = 203] = "LoginSuccess";
    StatusCodes[StatusCodes["badRequest"] = 420] = "badRequest";
    StatusCodes[StatusCodes["badId"] = 421] = "badId";
    StatusCodes[StatusCodes["notFound"] = 422] = "notFound";
    StatusCodes[StatusCodes["duplicateFound"] = 423] = "duplicateFound";
    StatusCodes[StatusCodes["multipleFound"] = 424] = "multipleFound";
    StatusCodes[StatusCodes["unknownError"] = 499] = "unknownError";
})(StatusCodes = exports.StatusCodes || (exports.StatusCodes = {}));
