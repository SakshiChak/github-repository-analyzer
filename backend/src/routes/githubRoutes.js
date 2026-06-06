import express from "express";
import { analyzeRepository, getSummary } from "../controllers/githubController.js";

const router = express.Router();

router.post("/analyze", analyzeRepository);
router.get("/summary/:repoKey", getSummary);

export default router;