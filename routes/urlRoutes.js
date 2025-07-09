import express from "express";
import { HandleDashboard, HandleShortenUrl, HandleRedirectUrl, HandleUrlAnalytics, HandleQRCode } from "../controllers/urlController.js";
import {validateUrl} from "../middleware/validate.js"
import { authCheck } from "../middleware/authMiddleware.js";
const router =  express.Router();


router.get('/dashboard',  HandleDashboard) // add authcheck
router.post('/api/shorten', validateUrl, HandleShortenUrl ) // add authcheck
router.get('/:shortid', HandleRedirectUrl)
router.get('/api/analytics/:shortid', HandleUrlAnalytics ) // add authcheck
router.get('/qr/:shortid', HandleQRCode) // add authcheck

export default router;