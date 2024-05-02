import mongoose from "mongoose";
import colors from 'colors';
import {exit} from 'node:process'

export const connectDB= async()=>{
    try {
        const conection = await mongoose.connect(process.env.DATABASE_URL)
        console.log(colors.bgGreen(`${conection.connection.host}:${conection.connection.port}`))
    } catch (error) {
        console.log(colors.bgRed(error.message))
        exit(1);
    }
}