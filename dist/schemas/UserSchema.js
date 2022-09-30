"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    login: { type: String, required: [true, 'add login'], unique: true },
    type: { type: String, default: 'User' },
    password: { type: String, required: [true, 'add password'] },
    icon: { type: String, default: '' },
}, {
    timestamps: true
});
exports.UserModel = (0, mongoose_1.model)('Users', UserSchema);
