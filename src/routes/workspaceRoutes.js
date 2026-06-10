const express = require("express");
const router = express.Router();

const {
    createWorkspace,
    getWorkspaces
} = require("../controllers/workspaceController");

router.post("/", createWorkspace);
router.get("/", getWorkspaces);

module.exports = router;
// Serve frontend
app.use(express.static(path.join(__dirname, "frontend")));