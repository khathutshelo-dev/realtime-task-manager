const pool = require("../config/db");

// CREATE TASK
const createTask = async (req, res) => {
    try {
        const {
            column_id,
            title,
            description,
            assignee_id,
            priority,
            due_date,
            position
        } = req.body;

        const task = await pool.query(
            `INSERT INTO tasks 
            (column_id, title, description, assignee_id, priority, due_date, position) 
            VALUES ($1,$2,$3,$4,$5,$6,$7)
            RETURNING *`,
            [column_id, title, description, assignee_id, priority, due_date, position]
        );

        res.status(201).json({
            message: "Task created",
            task: task.rows[0]
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }

    createLog(
    column_id,
    assignee_id,
    `Task created: ${title}`
);
};


// GET TASKS BY COLUMN
const getTasksByColumn = async (req, res) => {
    try {
        const { column_id } = req.params;

        const tasks = await pool.query(
            "SELECT * FROM tasks WHERE column_id = $1 ORDER BY position ASC",
            [column_id]
        );

        res.json(tasks.rows);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
};


// UPDATE TASK (for drag & drop later)
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            column_id,
            position
        } = req.body;

        const task = await pool.query(
            `UPDATE tasks 
            SET column_id = $1, position = $2
            WHERE id = $3
            RETURNING *`,
            [column_id, position, id]
        );

        res.json({
            message: "Task updated",
            task: task.rows[0]
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    createTask,
    getTasksByColumn,
    updateTask
};

const { createLog } = require("./activityController");