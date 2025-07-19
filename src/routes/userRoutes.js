import { Router } from "express";
import { getUsers } from "../controllers/userController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();

router.use(authenticate);
router.get("/", getUsers);

// TODO: get all users admin and manager
// get single
// update and delete admins only

export default router;
