import express from "express";
import cors from "cors";
import helmet from "helmet";
import runCleanup from "./utils/cleanup.js";
import nodeCron from "node-cron";


const app = express();



// As Server Starts it will run DB Cleanup
runCleanup();

 // It will daily cleanup at 2 AM
  nodeCron.schedule('0 2 * * *', () => {
    runCleanup();
  });




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




