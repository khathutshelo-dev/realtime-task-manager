const pool = require("../config/db");

// CREATE BOARD
const createBoard = async (req, res) => {
    try {
        const { workspace_id, name } = req.body;

        const board = await pool.query(
            "INSERT INTO boards (workspace_id, name) VALUES ($1, $2) RETURNING *",
            [workspace_id, name]
        );

        res.status(201).json({
            message: "Board created",
            board: board.rows[0]
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// GET BOARDS BY WORKSPACE
const getBoardsByWorkspace = async (req, res) => {
    try {
        const { workspace_id } = req.params;

        const boards = await pool.query(
            "SELECT * FROM boards WHERE workspace_id = $1",
            [workspace_id]
        );

        res.json(boards.rows);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    createBoard,
    getBoardsByWorkspace
};