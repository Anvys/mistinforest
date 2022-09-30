import {connect} from "mongoose";
import dotenv from "dotenv";
dotenv.config()
const HOST = process.env.DB_HOST || `0.0.0.0`
const PORT = process.env.DB_PORT || `27017`
const DB_NAME = process.env.DB_NAME || `mistinfodb`
export const dbconnect = async () => {
    return await connect(`mongodb://${HOST}:${PORT}/${DB_NAME}`);
}