const express = require("express");
const router = express.Router();

const {
    createTask,
    getTasksByColumn,
    updateTask
} = require("../controllers/taskController");

// create task
router.post("/", createTask);

// get tasks in column
router.get("/:column_id", getTasksByColumn);

// update task (drag & drop later)
router.put("/:id", updateTask);

module.exports = router;
// Serve frontend
app.use(express.static(path.join(__dirname, "frontend")));