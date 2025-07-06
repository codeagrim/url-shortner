import express from "express";
import { HandleShortenUrl, HandleRedirectUrl, HandleUrlAnalytics, HandleQRCode } from "../controllers/urlController.js";
import {validateUrl} from "../middleware/validate.js"
import { authCheck } from "../middleware/authMiddleware.js";
const router =  express.Router();


router.post('/api/shorten', validateUrl, HandleShortenUrl )
router.get('/:shortid', HandleRedirectUrl)
router.get('/api/analytics/:shortid', authCheck, HandleUrlAnalytics )
router.get('/qr/:shortid', HandleQRCode)

export default router;