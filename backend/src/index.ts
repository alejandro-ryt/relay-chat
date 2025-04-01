import express, { Express } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import routes from "@/routes/index";
import connectDB from "@/db/dbConfig";
import { errorMiddleware } from "@/middlewares/errorMiddleware";
const app: Express = express();
const server = createServer(app);
// Initialize socket
const io = new Server(server);
const PORT: number = 3001;

// Connect to mongo
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/api", routes);

app.use(errorMiddleware);


io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
