const express = require("express");
const router = express.Router();

const {
    createBoard,
    getBoardsByWorkspace
} = require("../controllers/boardController");

router.post("/", createBoard);

// GET boards inside workspace
router.get("/:workspace_id", getBoardsByWorkspace);

module.exports = router;
