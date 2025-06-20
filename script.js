import express from "express";
import dotenv from "dotenv";
import dbConnect from "./db/db.js";
import urlrouter from "./routes/urlRoutes.js";
import cors from "cors";
import helmet from "helmet";


dotenv.config();

const app = express();


//connect to DB
dbConnect().then(
    app.listen(process.env.PORT, '0.0.0.0', () => {
    console.log(`Server Started at ${process.env.PORT}`)
})
).catch((err)=>{
    console.log("Mongo DB Connection Error", err)
})


// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/', urlrouter)
