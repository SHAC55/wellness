import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { loginUser, registerUser } from "../controller/authController.js";

const authRoute = express.Router() ;

authRoute.post('/register',registerUser)
authRoute.post('/login',loginUser)

export default authRoute  ;