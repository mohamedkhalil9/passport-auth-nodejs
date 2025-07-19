import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware.js";

const profileRouter = Router();

profileRouter.use(authenticate);

profileRouter.get("/");

profileRouter.route("/:id").get().patch().delete();

export default profileRouter;
