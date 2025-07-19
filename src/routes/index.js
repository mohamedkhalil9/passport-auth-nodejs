import { Router } from "express";
import authRouter from "./authRoutes.js";
import profileRouter from "./profileRoutes.js";
import userRouter from "./userRoutes.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/profile", profileRouter);
router.use("/users", userRouter);

export default router;
