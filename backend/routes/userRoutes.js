import express from "express";
import { regiterUser, loginUser, adminLogin } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post('/register', regiterUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)

export default userRouter;