import express from "express";
import { HandleDashboard, HandleShortenUrl, HandleRedirectUrl, HandleUrlAnalytics, HandleQRCode } from "../controllers/urlController.js";
import {validateUrl} from "../middleware/validate.js"
import { authCheck } from "../middleware/authMiddleware.js";
const router =  express.Router();


router.get('/dashboard', authCheck, HandleDashboard)
router.post('/api/shorten', validateUrl, authCheck, HandleShortenUrl )
router.get('/:shortid', HandleRedirectUrl)
router.get('/api/analytics/:shortid', authCheck, HandleUrlAnalytics )
router.get('/qr/:shortid', authCheck, HandleQRCode)

export default router;