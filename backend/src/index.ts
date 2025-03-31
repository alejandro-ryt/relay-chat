import express, { Express } from "express";

import connectDB from "@/db/dbConfig";
const app: Express = express();
const PORT: Number = 5000;

// Connect to mongo
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Routes

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
