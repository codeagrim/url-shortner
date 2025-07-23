import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();


// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json()); // Parse Json Data
app.use(express.urlencoded( {extended: true })) //Parse URl encoded Form Data


// Routers

import urlRoutes from "./routes/urlRoutes.js";
import authRoutes from "./routes/authRoutes.js";


app.use('/', urlRoutes)
app.use('/auth/api', authRoutes)


export default app;




