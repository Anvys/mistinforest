import {connect} from "mongoose";

export const dbconnect = async () => {
    return await connect('mongodb://0.0.0.0:27017/mistinfodb');
}