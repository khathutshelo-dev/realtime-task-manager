const express = require("express");
const router = express.Router();

const {
    createColumn,
    getColumnsByBoard
} = require("../controllers/columnController");

// create column
router.post("/", createColumn);

// get columns in a board
router.get("/:board_id", getColumnsByBoard);

module.exports = router;
