const pool = require("../config/db");

// CREATE LOG
const createLog = async (board_id, user_id, message) => {
    await pool.query(
        "INSERT INTO activity_log (board_id, user_id, message) VALUES ($1,$2,$3)",
        [board_id, user_id, message]
    );
};

// GET LOGS
const getLogs = async (req, res) => {
    try {
        const { board_id } = req.params;

        const logs = await pool.query(
            "SELECT * FROM activity_log WHERE board_id = $1 ORDER BY created_at DESC",
            [board_id]
        );

        res.json(logs.rows);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { createLog };