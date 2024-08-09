import { Router, type Request, type Response } from "express";
import { login, signup } from "../controllers/auth.controller";

const authRouter: Router = Router();

authRouter.post("/login", login);
authRouter.post("/signup", signup);

export default authRouter;
