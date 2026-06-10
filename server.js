require("dotenv").config();
const path = require("path");

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

// ROUTES
const authRoutes = require("./src/routes/authRoutes");
const workspaceRoutes = require("./src/routes/workspaceRoutes");
const boardRoutes = require("./src/routes/boardRoutes");
const columnRoutes = require("./src/routes/columnRoutes");
const taskRoutes = require("./src/routes/taskRoutes");

// INIT APP
const app = express();
const server = http.createServer(app);

// SOCKET.IO
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// MAKE IO AVAILABLE IN CONTROLLERS
app.set("io", io);

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/columns", columnRoutes);
app.use("/api/tasks", taskRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
    res.json({
        message: "Real-Time Task Manager API Running"
    });
});

// ---------------------------
// SOCKET REAL-TIME SYSTEM
// ---------------------------

const onlineUsers = new Map();

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // JOIN BOARD ROOM
    socket.on("join_board", ({ boardId, userId }) => {
        socket.join(`board_${boardId}`);

        onlineUsers.set(socket.id, {
            userId,
            boardId
        });

        // notify users in board
        io.to(`board_${boardId}`).emit("user_joined", {
            userId,
            onlineCount: [...onlineUsers.values()].filter(
                u => u.boardId === boardId
            ).length
        });
    });

    // LEAVE BOARD ROOM
    socket.on("leave_board", ({ boardId }) => {
        socket.leave(`board_${boardId}`);
    });

    // TASK MOVEMENT (DRAG & DROP)
    socket.on("move_task", (data) => {
        io.emit("task_updated", data);
    });

    socket.on("disconnect", () => {
        onlineUsers.delete(socket.id);
        console.log("User disconnected:", socket.id);
    });
});

// ---------------------------
// START SERVER
// ---------------------------

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});