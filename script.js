import express from "express";
import dotenv from "dotenv";
import dbConnect from "./db/db.js";
import urlrouter from "./routes/urlRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import helmet from "helmet";

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


// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json()); // Parse Json Data
app.use(express.urlencoded( {extended: true })) //Parse URl encoded Form Data

app.use('/', urlrouter)
app.use('/auth/api', authRoutes)