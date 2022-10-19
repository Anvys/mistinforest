"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = exports.generateToken = void 0;
const express_1 = __importDefault(require("express"));
const statusCodes_1 = require("../utils/statusCodes");
const UserSchema_1 = require("../schemas/UserSchema");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMW_1 = require("../middleware/authMW");
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};
exports.generateToken = generateToken;
//fetch('http://localhost:3333/api/auth/new',{method:'post', body:JSON.stringify({login:'test', password:'test123',icon:''}),headers:{'content-type':'application/json'}}).then(json => console.log(json)).catch(e=>console.log(e.message))
const authRoute = () => {
    // type TGetOneReq = Request<{ id: string }>;
    // type TPostReq = Request<{ id: string }, {}, TRequestBody<T>>;
    // type TRes = Response<TResponseBody<T>>;
    const route = express_1.default.Router();
    // @desc    Register new user
    // @route   POST /api/auth/new
    // @access  Public
    route.post('/new', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`New register`, req.body);
        const { login, password, icon } = req.body;
        if (!login || !password) {
            res.status(statusCodes_1.StatusCodes.badRequest);
            res.json({
                status: statusCodes_1.StatusCodes.badRequest,
                msg: ['Please add all fields'],
                data: {}
            });
            throw new Error('Please add all fields');
        }
        else {
            // Check if user exists
            const userExists = yield UserSchema_1.UserModel.findOne({ login });
            if (userExists) {
                res.status(statusCodes_1.StatusCodes.badRequest);
                res.json({
                    status: statusCodes_1.StatusCodes.badRequest,
                    msg: ['User already exists'],
                    data: {}
                });
                throw new Error('User already exists');
            }
            // Hash password
            const salt = yield bcryptjs_1.default.genSalt(10);
            const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
            // Create user
            const user = yield UserSchema_1.UserModel.create({
                login,
                icon,
                password: hashedPassword,
            });
            if (user) {
                res.status(statusCodes_1.StatusCodes.Created).json({
                    status: statusCodes_1.StatusCodes.Created,
                    msg: [],
                    data: {
                        _id: user.id,
                        login: user.login,
                        icon: user.icon,
                        token: (0, exports.generateToken)(String(user._id)),
                    }
                });
            }
            else {
                res.status(statusCodes_1.StatusCodes.badRequest);
                res.json({
                    status: statusCodes_1.StatusCodes.badRequest,
                    msg: ['Invalid user data'],
                    data: {}
                });
                throw new Error('Invalid user data');
            }
        }
    })));
    // @desc    Authenticate a user
    // @route   POST /api/auth/login
    // @access  Public
    route.post('/login', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`login`);
        const { login, password } = req.body;
        // Check for user email
        const user = yield UserSchema_1.UserModel.findOne({ login });
        if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
            res.json({
                status: statusCodes_1.StatusCodes.LoginSuccess,
                msg: [],
                data: {
                    _id: user.id,
                    login: user.login,
                    icon: user.icon,
                    token: (0, exports.generateToken)(String(user._id)),
                }
            });
        }
        else {
            res.status(statusCodes_1.StatusCodes.badRequest)
                .json({
                status: statusCodes_1.StatusCodes.badRequest,
                msg: ['Invalid credentials'],
                data: {}
            });
            throw new Error('Invalid credentials');
        }
    })));
    // @desc    Get user data
    // @route   GET /api/auth/me
    // @access  Private
    route.get('/me', authMW_1.authMW, (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`me`);
        res.status(statusCodes_1.StatusCodes.Ok);
        res.json({
            status: statusCodes_1.StatusCodes.Ok,
            msg: [],
            data: req.user
        });
    })));
    return route;
};
exports.authRoute = authRoute;
