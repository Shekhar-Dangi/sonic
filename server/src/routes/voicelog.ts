import express from "express";
import { requireAuth } from "../middleware/auth";
import { logVoice } from "../controllers/voicelogController";

const router = express.Router();

router.post("/", requireAuth, logVoice);

export default router;
