const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();

const app = express();
const server = http.createServer(app);

// ========================
// MIDDLEWARE
// ========================
app.use(express.json());

// ✅ FIXED CORS (IMPORTANT FOR FRONTEND LOGIN)
app.use(
  cors({
    origin: [
      "http://localhost:4200",
      "https://realtime-task-manager-2.onrender.com" // 👈 CHANGE THIS
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

// ========================
// TEST ROUTE
// ========================
app.get("/", (req, res) => {
  res.send("Backend is running ✔");
});

// ========================
// ROUTES
// ========================
const authRoutes = require("./src/routes/authRoutes");
const workspaceRoutes = require("./src/routes/workspaceRoutes");
const boardRoutes = require("./src/routes/boardRoutes");
const taskRoutes = require("./src/routes/taskRoutes");
const columnRoutes = require("./src/routes/columnRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/columns", columnRoutes);

// ========================
// SOCKET.IO (REALTIME)
// ========================
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// ========================
// SERVER START
// ========================
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
