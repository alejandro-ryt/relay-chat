import express, { Express } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import routes from "@/routes/index";
import connectDB from "@/db/dbConfig";
import cors from "cors";
import dotenv from "dotenv";
import { errorMiddleware } from "@/middlewares/errorMiddleware";
import { handleSocketEvents } from "@/sockets/chatSocket";
const app: Express = express();
const server = createServer(app);
app.use(cookieParser());

dotenv.config();
const PORT: number = Number(process.env.PORT) ?? 3001;

// Define a CORS options object
const corsOptions = {
  origin: "http://localhost:5173", // Allow requests from your client origin
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Initialize socket
const io = new Server(server, { cors: corsOptions });

app.use(cors(corsOptions));

// Middleware to parse JSON
app.use(express.json());

app.use("/api", routes);

app.use(errorMiddleware);

// Setup socket events
io.on("connection", (socket) => {
  // Pass the socket to the handler function
  handleSocketEvents(io, socket);
});

server.listen(PORT, () => {
  // Connect to mongo
  connectDB();
  console.log(`Server running on http://localhost:${PORT}`);
});
