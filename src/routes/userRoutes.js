import { Router } from "express";
import { getMe } from "../controllers/userController.js";
import authenticate from "../middlewares/authMiddleware.js";

const router = Router();

router.use(authenticate);
router.get("/me", getMe);

export default router;
