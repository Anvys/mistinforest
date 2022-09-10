import express, {Request, Response, Router} from "express";
import {StatusCodes} from "../utils/statusCodes";
import {TCombineData, TRequestBody, TResponseBody} from "../utils/types";
import {Model} from "mongoose";
import {UserModel} from "../schemas/UserSchema";
import asyncHandler from "express-async-handler";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import {authMW} from "../middleware/authMW";

export const generateToken = (id: string) => {
    return jwt.sign({id}, process.env.JWT_SECRET as string, {
        expiresIn: '30d',
    })
}
export const authRoute = (): Router => {
    // type TGetOneReq = Request<{ id: string }>;
    // type TPostReq = Request<{ id: string }, {}, TRequestBody<T>>;
    // type TRes = Response<TResponseBody<T>>;
    const route = express.Router();
    // @desc    Register new user
// @route   POST /api/auth/new
// @access  Public
    route.post('/new', asyncHandler(async (req, res) => {
        console.log(`New register`)
        const {login, password, icon} = req.body

        if (!login || !password) {
            res.status(StatusCodes.badRequest)
            res.json({
                status: StatusCodes.badRequest,
                msg: ['Please add all fields'],
                data: {}
            })
            throw new Error('Please add all fields')
        }

        // Check if user exists
        const userExists = await UserModel.findOne({login})

        if (userExists) {
            res.status(StatusCodes.badRequest)
            res.json({
                status: StatusCodes.badRequest,
                msg: ['User already exists'],
                data: {}
            })
            throw new Error('User already exists')
        }

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create user
        const user = await UserModel.create({
            login,
            icon,
            password: hashedPassword,
        })

        if (user) {
            res.status(StatusCodes.Created).json({
                status: StatusCodes.Created,
                msg: [],
                data: {
                    _id: user.id,
                    login: user.login,
                    icon: user.icon,
                    token: generateToken(String(user._id)),
                }

            })
        } else {
            res.status(StatusCodes.badRequest)
            res.json({
                status: StatusCodes.badRequest,
                msg: ['Invalid user data'],
                data: {}
            })
            throw new Error('Invalid user data')
        }
    }))
    // @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
    route.post('/login', asyncHandler(async (req, res) => {
        console.log(`login`)
        const {login, password} = req.body

        // Check for user email
        const user = await UserModel.findOne({login})

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                status: StatusCodes.LoginSuccess,
                msg: [],
                data: {
                    _id: user.id,
                    login: user.login,
                    icon: user.icon,
                    token: generateToken(String(user._id)),
                }
            })
        } else {
            res.status(StatusCodes.badRequest)
                .json({
                status: StatusCodes.badRequest,
                msg: ['Invalid credentials'],
                data: {}
            })
            throw new Error('Invalid credentials')
        }
    }))
    // @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
    route.get('/me', authMW, asyncHandler(async (req, res) => {
        console.log(`me`)
        res.status(StatusCodes.Ok)
        res.json({
            status: StatusCodes.Ok,
            msg: [],
            data: req.user
        })
    }))
    return route
}