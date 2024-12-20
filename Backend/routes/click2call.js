// routes/click2call.js
import express from "express";
import { getConfig, updateConfig, resetConfig } from "../controller/click2call.js";

const router = express.Router();

router.get("/config", getConfig);
router.put("/config", updateConfig);
router.post("/config/reset", resetConfig);

export default router;