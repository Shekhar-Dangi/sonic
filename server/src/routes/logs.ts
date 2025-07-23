import express from "express";
import { requireAuth } from "../middleware/auth";
import { createLog, getLogs } from "../controllers/logsController";

const router = express.Router();

router.post("/", requireAuth, createLog);
router.get("/", requireAuth, getLogs);

export default router;
