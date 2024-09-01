import express from 'express';
import { registerController } from '../controllers/authController.js';
//router object
const router = express.Router();
//routes
//REGISTER || POST
router.post('/register',registerController);
//LOGIN || POST
router.post('/login',);

//export
export default router;