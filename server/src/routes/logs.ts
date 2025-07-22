import express from "express";
import { requireAuth } from "../middleware/auth";
import * as logsController from "../controllers/logsController";

const router = express.Router();

router.post("/", requireAuth, logsController.createLog);
router.get("/", requireAuth, logsController.getLogs);

export default router;
