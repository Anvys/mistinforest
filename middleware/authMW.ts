import jwt from 'jsonwebtoken'
import {Request, Response} from "express";
import asyncHandler from 'express-async-handler'
import {TUser, UserModel} from "../schemas/UserSchema";
import {IUserRequest} from "../utils/authTypes";

const { JWT_SECRET } = process.env;

export const authMW = asyncHandler(async (req: IUserRequest, res: Response, next) => {
    let token
    // console.log(`secret: ${JWT_SECRET} // MW:`)
    // console.log(req.headers.authorization)

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded = jwt.verify(token, JWT_SECRET as string) as {id: string}

            // Get user from the token
            req.user = await UserModel.findById(decoded.id).select('-password -type')

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

//
//
// const jwt = require('jsonwebtoken')
// const asyncHandler = require('express-async-handler')
// const User = require('../models/userModel')
//
// const protect = asyncHandler(async (req, res, next) => {

//
// module.exports = { protect }