import express, { Express } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import routes from "@/routes/index";
import connectDB from "@/db/dbConfig";
import cors from "cors";
import { errorMiddleware } from "@/middlewares/errorMiddleware";
import { handleSocketEvents } from "@/sockets/chatSocket";
const app: Express = express();
const server = createServer(app);
const PORT: number = 3001;

// Define a CORS options object
const corsOptions = {
  origin: "http://localhost:5173", // Allow requests from your client origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
  headers: ["Content-Type", "Authorization"], // Specify allowed headers
};

// Initialize socket
const io = new Server(server, { cors: corsOptions });

app.use(cors(corsOptions));

// Connect to mongo
connectDB();

// Middleware to parse JSON
app.use(express.json());
app.use(errorMiddleware);

app.use("/api", routes);

// Setup socket events
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  // Pass the socket to the handler function
  handleSocketEvents(io, socket);
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
