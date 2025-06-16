import express from "express";
import { HandleShortenUrl } from "../controllers/urlController.js";
import {validateUrl} from "../middleware/validate.js"
const router =  express.Router();


router.post('/api/shorten', validateUrl, HandleShortenUrl )

export default router;