import express from "express";
import { HandleShortenUrl, HandleRedirectUrl } from "../controllers/urlController.js";
import {validateUrl} from "../middleware/validate.js"
const router =  express.Router();


router.post('/api/shorten', validateUrl, HandleShortenUrl )
router.get('/:shortid', HandleRedirectUrl)

export default router;