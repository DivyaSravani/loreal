import dotenv from "dotenv";

dotenv.config();
console.log(
  "OpenAI key loaded:",
  process.env.OPENAI_API_KEY ? "YES" : "NO"
);

import app from "./app.js";
import { connectDatabase } from "./config/database.js";

const PORT = process.env.PORT || 5000;

await connectDatabase();

app.listen(PORT, () => {
  console.log(
    `Claims Intelligence API running on port ${PORT}`
  );
});