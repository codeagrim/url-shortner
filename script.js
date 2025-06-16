import express from "express";
import dotenv from "dotenv";
import dbConnect from "./db/db.js";
import urlrouter from "./routes/urlRoutes.js";

dotenv.config();

const app = express();


//connect to DB
dbConnect().then(
    app.listen(process.env.PORT, () => {
    console.log(`Server Started at ${process.env.PORT}`)
})
).catch((err)=>{
    console.log("Mongo DB Connection Error", err)
})


app.use('/', urlrouter)
