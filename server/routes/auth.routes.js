import { Router } from "express";
import { signIn, signUp, logout } from "../controllers/auth.control.js";

const authRouter = Router();
authRouter.post("/login", signIn);
authRouter.post("/register", signUp);
authRouter.post("/logout", logout);

export default authRouter;
