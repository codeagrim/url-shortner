import mongoose from "mongoose";
import {DB_NAME} from "../constants.js"

async function dbConnect() {
    try {
        
        const dbconnectInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(`DB Connected : DB HOST = ${dbconnectInstance.connection.host}`)

    } catch (error) {
        console.log("DB Error...", error)
        process.exit(1)
    }
}

export default dbConnect;

