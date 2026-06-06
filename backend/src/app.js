import express from "express";
import cors from "cors";

import githubRoutes from "./routes/githubRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("GitHub Repo Analyzer API is running 🚀");
});

app.use("/api/github", githubRoutes);

export default app;