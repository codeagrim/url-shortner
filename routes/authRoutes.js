import express from "express";
import { HandleLogin, HandleSignup} from "../controllers"
const router = express.Router();


// sign up
router.post('/signup', HandleSignup)
// login
router.post('/login', HandleLogin)

export default router;
