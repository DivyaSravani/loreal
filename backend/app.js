import express from "express";
import cors from "cors";

import claimRoutes from "./routes/claimRoutes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json({ limit: "2mb" }));

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Claims Intelligence API is running",
  });
});

app.use("/api/claims", claimRoutes);

export default app;