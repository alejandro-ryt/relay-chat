import express, { Request, Response, Express } from "express";
import cookieParser from 'cookie-parser';
import taskRoutes from "@/routes/taskRoutes";
import userRoutes from "@/routes/userRoutes";
import authRoutes from "@/routes/authRoute";

import connectDB from "@/db/dbConfig"
const app: Express = express();
const PORT: Number = 5000;

// Connect to mongo
connectDB();

// Middleware to parse JSON
app.use(express.json());
// Cookie parser middleware
app.use(cookieParser());

// Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

