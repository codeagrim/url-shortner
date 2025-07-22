import app from "./app.js";
import dbConnect from "./db/db.js";
import dotenv from "dotenv";


dotenv.config();

//connect to DB
dbConnect().then(
    app.listen(process.env.PORT, () => {
    console.log(`Server Started at ${process.env.PORT}`)
})
).catch((err)=>{
    console.log("Mongo DB Connection Error", err)
})

