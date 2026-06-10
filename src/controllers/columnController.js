const pool = require("../config/db");

// CREATE COLUMN
const createColumn = async (req, res) => {
    try {
        const { board_id, title, position } = req.body;

        const column = await pool.query(
            "INSERT INTO columns (board_id, title, position) VALUES ($1, $2, $3) RETURNING *",
            [board_id, title, position]
        );

        res.status(201).json({
            message: "Column created",
            column: column.rows[0]
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// GET COLUMNS BY BOARD
const getColumnsByBoard = async (req, res) => {
    try {
        const { board_id } = req.params;

        const columns = await pool.query(
            "SELECT * FROM columns WHERE board_id = $1 ORDER BY position ASC",
            [board_id]
        );

        res.json(columns.rows);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    createColumn,
    getColumnsByBoard
};