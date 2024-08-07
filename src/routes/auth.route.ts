import { Router, type Request, type Response } from "express";
import { login } from "../controllers/auth.controller";

const authRouter: Router = Router();

authRouter.get("/login", login);

export default authRouter;
