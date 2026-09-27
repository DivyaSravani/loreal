import express from "express";

import {
  assessClaim,
} from "../controllers/claimController.js";

const router = express.Router();

router.post("/assess", assessClaim);

export default router;