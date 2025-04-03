import express, { Express } from "express";
import routes from "@/routes/index";
import connectDB from "@/db/dbConfig";
import cors from "cors";
import { errorMiddleware } from "@/middlewares/errorMiddleware";
const app: Express = express();
const PORT: number = 3001;

// Define a CORS options object
const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    const allowedOrigins = ["http://localhost:5173"];

    if (allowedOrigins.indexOf(origin as string) !== -1 || !origin) {
      // If the origin is in the allowedOrigins list or there's no origin (like from a same-origin request), allow it
      callback(null, true);
    } else {
      // If the origin is not in the allowed list, block it
      callback(new Error("Not allowed by CORS"), false);
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"], // List allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

app.use(cors(corsOptions));

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
