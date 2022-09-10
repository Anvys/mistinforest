import {model, Schema} from "mongoose";

export type TUserType = 'User' | 'Mod' | 'Admin'
export type TUser = {
    login: string
    type: TUserType
    password: string
    icon: string
}
const UserSchema = new Schema<TUser>({
    login: {type: String, required: [true, 'add login'], unique: true},
    type: {type: String, default: 'User'},
    password: {type: String, required: [true, 'add password']},
    icon: {type: String, default: ''},
}, {
    timestamps: true
})

export const UserModel = model<TUser>('Users', UserSchema)
