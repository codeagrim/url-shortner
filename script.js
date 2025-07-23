import app from "./app.js";
import dbConnect from "./db/db.js";
import dotenv from "dotenv";
import runCleanup from "./utils/cleanup.js";
import nodeCron from "node-cron";




dotenv.config();

//connect to DB
dbConnect().then(
    app.listen(process.env.PORT, () => {
    console.log(`Server Started at ${process.env.PORT}`)
})
).catch((err)=>{
    console.log("Mongo DB Connection Error", err)
})


// As Server Starts it will run DB Cleanup
runCleanup();

 // It will daily cleanup at 2 AM
  nodeCron.schedule('0 2 * * *', () => {
    runCleanup();
  });
