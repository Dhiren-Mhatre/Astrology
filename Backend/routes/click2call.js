// routes/click2call.js
import express from "express";
import { getConfig, updateConfig, resetConfig ,initiateClick2Call} from "../controller/click2call.js";

const router = express.Router();

router.get("/config", getConfig);
router.put("/config", updateConfig);
router.post("/config/reset", resetConfig);
router.post("/initiate", initiateClick2Call);
export default router;