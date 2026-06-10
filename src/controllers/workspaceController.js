const pool = require("../config/db");

// CREATE WORKSPACE
const createWorkspace = async (req, res) => {
    try {
        const { name, owner_id } = req.body;

        const workspace = await pool.query(
            "INSERT INTO workspaces (name, owner_id) VALUES ($1, $2) RETURNING *",
            [name, owner_id]
        );

        res.status(201).json({
            message: "Workspace created",
            workspace: workspace.rows[0]
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// GET ALL WORKSPACES
const getWorkspaces = async (req, res) => {
    try {
        const workspaces = await pool.query(
            "SELECT * FROM workspaces"
        );

        res.json(workspaces.rows);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    createWorkspace,
    getWorkspaces
};