import express, { Express } from "express";
import routes from "./routes";
import connectDB from "@/db/dbConfig";
import { errorMiddleware } from "./middlewares/errorMiddleware";
const app: Express = express();
const PORT: number = 3001;

// Connect to mongo
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/api", routes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
